import { createClass } from 'react';
import { compose, dissoc, pick, curry, memoize } from 'ramda';
import PureRenderMixin from 'react-addons-pure-render-mixin';
import Perf from 'react-addons-perf';

/**
 * When an object is passed then it's simply returned. However if a function is passed
 * it is assumed to be the `render` function, and will therefore return an object with
 * the `render` function as the only key.
 *
 * @method transform
 * @param {Object|Function} x
 * @return {Object}
 */
export const transform = memoize(x => {
    const isFunction = typeof x === 'function';
    return isFunction ? { render: x } : x;
});

/**
 * Takes the developer-defined component and wraps the React life-cycle methods in Keo-defined
 * functions to pass in arguments and remove context (`this`).
 *
 * @method wrapMethods
 * @param {Object} x
 * @return {Object}
 */
export const wrapMethods = memoize(x => {

    const propertyWhitelist = ['props', 'context', 'nextProps', 'prevProps'];
    const passArgs = pick(propertyWhitelist);

    return Object.keys(x).reduce((accumulator, key) => {

        // Wrap each developer-defined function in the Keo-defined wrapper, and pass in the
        // arguments for destructuring.
        return { ...accumulator, [key]: function lifecycleMethod(...args) {

            const lifecycleArguments = passArgs(this, args);
            return x[key].call(null, lifecycleArguments);

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
 * @method stitch
 * @param {Object} fns
 * @return {createClass}
 */
export const stitch = memoize(fns => {

    const methodBlacklist = ['getInitialState', 'mixins'];
    const create = compose(wrapMethods, rejectProps(methodBlacklist), transform);
    const component = create(fns);

    return createClass({
        mixins: [PureRenderMixin],
        ...component
    });

});
