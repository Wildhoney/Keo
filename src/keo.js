import { createClass } from 'react';
import { compose, dissoc, pick, curry, memoize, pickBy } from 'ramda';
import PureRenderMixin from 'react-addons-pure-render-mixin';
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

            const lifecycleArguments = passArgs(this, args);
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
 * Takes the current component definition, and adds the standard Keo `shouldComponentUpdate`
 * function unless it's been specified on the component itself by the developer.
 * @see: https://facebook.github.io/react/docs/pure-render-mixin.html
 *
 * @method applyShouldComponent
 * @param {Object} x
 * @return {Object}
 */
export const applyShouldComponent = memoize(x => {

    const shouldComponentUpdate = () => {};

    return { shouldComponentUpdate, ...x };

});

/**
 * @method stitch
 * @param {Object|Function} definition
 * @return {createClass}
 */
export const stitch = memoize(definition => {

    // Create the component by removing forbidden or non-related functions and properties.
    const createComponent = compose(rejectProps(propertyBlacklist), ensureRenderMethod);
    const component = createComponent(definition);

    // Wrap the methods in Keo-specific functions for applying properties as arguments.
    const encompassMethods = compose(passArguments, applyShouldComponent, onlyFunctions);
    console.log(encompassMethods);

    // Construct the React component from the prepared blueprint.
    return createClass({ ...component, ...encompassMethods(component) });

});
