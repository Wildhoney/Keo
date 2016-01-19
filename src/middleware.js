import { objectAssign, resolving } from './keo';

/**
 * @method resolutionMap
 * @param {Array} args
 * @return {Array}
 */
export const resolutionMap = args => {

    return objectAssign({}, args, {
        props: { ...args.props, resolving }
    });

};
