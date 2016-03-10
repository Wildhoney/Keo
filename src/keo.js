import { createClass } from 'react';
import { compose, dissoc, pick, curry, memoize, pickBy } from 'ramda';
import Perf from 'react-addons-perf';

/**
 * @constant propertyBlacklist
 * @type {String[]}
 */
const propertyBlacklist = ['getInitialState', 'mixins'];

/**
 * @constant propertyWhitelist
 * @type {String[]}
 */
const propertyWhitelist = ['props', 'context', 'nextProps', 'prevProps'];

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

    const passArgs = pick(propertyWhitelist);
    const keys = Object.keys(x);

    return keys.reduce((accumulator, key) => {

        // Wrap each developer-defined function in the Keo-defined wrapper, and pass in the
        // arguments for destructuring.
        return { ...accumulator, [key]: function(...args) {

            const { dispatch } = this.props;
            const lifecycleArguments = { ...passArgs(this, args), dispatch };
            return x[key].call(undefined, lifecycleArguments);

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
        const props = Object.keys(propTypes);
        return props.some(key => this.props[key] !== nextProps[key]);
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
