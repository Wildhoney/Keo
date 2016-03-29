import { createClass } from 'react';
import { compose, dissoc, isNil, complement, pick, curry, memoize, identity, pickBy, keys } from 'ramda';
import WeakMap from 'es6-weak-map';
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
 * @method getIdentity
 * @param {Object} context
 * @return {Object}
 */
const getIdentity = context => {

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
const isFunction = memoize(x => typeof x === 'function');

/**
 * When an object is passed then it's simply returned. However if a function is passed
 * it is assumed to be the `render` function, and will therefore return an object with
 * the `render` function as the only key.
 *
 * @method ensureRenderMethod
 * @param {Object|Function} x
 * @return {Object}
 */
export const ensureRenderMethod = memoize(x => {
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
export const passArguments = memoize(x => {

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
            const args = filterArgs({ ...this, [name]: prop, dispatch, id: getIdentity(this) });

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
export const rejectProps = curry(memoize((blacklist, x) => {

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
export const onlyFunctions = memoize(x => {
    return pickBy(isFunction, x);
});

/**
 * Determines whether a component should be updated depending on whether its immutable
 * properties have changed as defined in the component's `propTypes`.
 * @see: https://facebook.github.io/react/docs/pure-render-mixin.html
 *
 * @method applyShouldComponentUpdate
 * @param {Object} propTypes
 * @param {Object} nextProps
 * @return {Boolean}
 */
export const applyShouldComponentUpdate = curry(function(propTypes, nextProps) {

    const inspectImmutableProperties = () => {
        return keys(propTypes).some(key => this.props[key] !== nextProps[key]);
    };

    return propTypes ? inspectImmutableProperties() : true;

});

/**
 * @method stitch
 * @param {Object|Function} definition
 * @return {createClass}
 */
export const stitch = memoize(definition => {

    // Create the component by removing forbidden or non-related functions and properties.
    const prepareComponent = memoize(compose(rejectProps(propertyBlacklist), ensureRenderMethod));
    const component = prepareComponent(definition);

    // Wrap the methods in Keo-specific functions for applying properties as arguments.
    const encompassMethods = memoize(compose(passArguments, onlyFunctions));
    const shouldComponentUpdate = applyShouldComponentUpdate(definition.propTypes);

    // Construct the React component from the prepared blueprint.
    return createClass({ ...component, shouldComponentUpdate, ...encompassMethods(component) });

});
