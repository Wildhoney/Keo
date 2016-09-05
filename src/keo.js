import React, { createClass } from 'react';
import { compose, dissoc, isNil, complement, pick, curry, identity, pickBy, keys } from 'ramda';
import WeakMap from 'es6-weak-map';
import { connect } from 'react-redux';
export { default as shadow } from './mixins/shadow';
export { default as custom } from './mixins/custom';

// Will be used in the future for benchmarking purposes when in dev mode.
// import Perf from 'react-addons-perf';

/**
 * @constant propertyBlacklist
 * @type {String[]}
 */
const propertyBlacklist = ['getInitialState', 'mixins'];

/**
 * @constant propertyWhitelist
 * @type {String[]}
 */
const propertyWhitelist = ['id', 'props', 'context', 'nextProps', 'prevProps', 'dispatch'];

/**
 * @constant identityStore
 * @type {WeakMap}
 */
const identityStore = new WeakMap();

/**
 * @method identityFor
 * @param {Object} context
 * @return {Object}
 */
const identityFor = context => {

    return identityStore.get(context) || (() => {
        const id = Symbol('keo/component');
        identityStore.set(context, id);
        return id;
    })();

};

/**
 * @method isFunction
 * @param {Object} x
 * @return {Boolean}
 */
const isFunction = (x => typeof x === 'function');

/**
 * When an object is passed then it's simply returned. However if a function is passed
 * it is assumed to be the `render` function, and will therefore return an object with
 * the `render` function as the only key.
 *
 * @method ensureRenderMethod
 * @param {Object|Function} x
 * @return {Object}
 */
const ensureRenderMethod = (x => {
    return isFunction(x) ? { render: x } : x;
});

/**
 * Takes the developer-defined component and wraps the React life-cycle methods in Keo-defined
 * functions to pass in arguments and remove context (`this`).
 *
 * @method passArguments
 * @param {Object} x
 * @return {Object}
 */
const passArguments = (x => {

    const filterArgs = compose(pickBy(complement(isNil)), pick(propertyWhitelist));

    // Wrap each developer-defined function in the Keo-defined wrapper, and pass in the
    // arguments for destructuring.
    return keys(x).reduce((accumulator, key) => {

        return { ...accumulator, [key]: function(prop) {

            // When an argument has been passed in, `prevProps` is only used in `componentDidUpdate`
            // whereas other lifecycle methods take `nextProps` instead.
            const name = key === 'componentDidUpdate' ? 'prevProps' : 'nextProps';

            // We then gather all of the arguments used for this function, taking the properties from
            // `this` and the first argument, which will be used as either `nextProps` or `prevProps`
            // depending on which function scope we're currently in.
            const props = this.props || {};
            const dispatch = props.dispatch || identity;
            const args = filterArgs({ ...this, [name]: prop, dispatch, id: identityFor(this) });

            // Finally filter the arguments against our whitelist; removing arguments which evaluate
            // to "undefined".
            return x[key].call(undefined, { ...args, args });

        }}

    }, {});

});

/**
 * Takes the component defined as an object blueprint and removes functions that have
 * been forbade by Keo, such as `getInitialState`.
 *
 * @method rejectProps
 * @param {Array} blacklist
 * @param {Object} x
 * @return {Function}
 */
const rejectProps = curry(((blacklist, x) => {

    return blacklist.reduce((accumulator, property) => {
        return { ...dissoc(property, accumulator) };
    }, x);

}));

/**
 * Yields only the functions when given an array of varying types.
 *
 * @method onlyFunctions
 * @param {Object} x
 * @return {Object}
 */
const onlyFunctions = (x => {
    return pickBy(isFunction, x);
});

/**
 * Determines whether a component should be updated depending on whether its immutable
 * properties have changed as defined in the component's `propTypes`.
 * @see: https://facebook.github.io/react/docs/pure-render-mixin.html
 *
 * @method propsModified
 * @param {Object} propTypes
 * @param {Object} nextProps
 * @return {Function}
 */
const propsModified = curry(function(propTypes, args) {

    return keys(propTypes).some(key => {
        return args.props[key] !== args.nextProps[key];
    });

});

/**
 * @method applyShouldUpdate
 * @param {Object} definition
 * @param {Object} args
 * @return {Boolean}
 */
const applyShouldUpdate = curry(function(definition, { args }) {

    const { shouldComponentUpdate = () => true } = definition;
    return propsModified(definition.propTypes, args) && shouldComponentUpdate(args);

});

/**
 * @method unwrap
 * @param {Object} smartComponent
 */
export const unwrap = smartComponent => {
    return smartComponent.WrappedComponent;
};

/**
 * @method stitch
 * @param {Object|Function} definition
 * @param {Function} [mapStateToProps]
 * @param {Object|Function} [mapDispatchToProps]
 * @param {Function} [mergeProps]
 * @return {createClass}
 */
export const stitch = ((definition, mapStateToProps, mapDispatchToProps, mergeProps) => {

    // Create the component by removing forbidden or non-related functions and properties.
    const prepareComponent = compose(rejectProps(propertyBlacklist), ensureRenderMethod);
    const component = { ...prepareComponent(definition), shouldComponentUpdate: applyShouldUpdate(definition) };

    // Wrap the methods in Keo-specific functions for applying properties as arguments.
    const encompassMethods = compose(passArguments, onlyFunctions);

    // Determine whether or not to wrap in React Redux's `connect` and then construct
    // the React component from the prepared blueprint.
    const reduxConnect = mapStateToProps || mapDispatchToProps || mergeProps ? connect : _ => x => x;
    return reduxConnect(mapStateToProps, mapDispatchToProps, mergeProps)(
        createClass({ ...component, ...encompassMethods(component) })
    );

});
