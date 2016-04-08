import React, { PropTypes } from 'react';
import { compose } from 'ramda';
import { stitch, shadow } from '../../../src/keo';

/**
 * @constant contextTypes
 * @type {Object}
 */
const contextTypes = {
    router: PropTypes.object.isRequired
};

/**
 * @method propTypes
 * @type {Object}
 */
const propTypes = {
    params: PropTypes.shape({
        status: PropTypes.string
    })
};

/**
 * @method render
 * @param {Object} context
 * @return {XML}
 */
const render = compose(shadow('css/components/filter-todos.css'), ({ props, context }) => {

    const {status} = props.params;

    return (
        <filter-todos>
            <ul>
                <li className="title">Filter:</li>
                <li>
                    <a className={`${status == null ? 'active' : ''}`}
                        onClick={() => context.router.push('/')}>
                        All
                    </a>
                </li>
                <li>
                    <a className={`${status === 'progress' ? 'active' : ''}`}
                       onClick={() => context.router.push('/progress')}>
                        In Progress
                    </a>
                </li>
                <li>
                    <a className={`${status === 'done' ? 'active' : ''}`}
                       onClick={() => context.router.push('/done')}>
                        Done
                    </a>
                </li>
            </ul>
        </filter-todos>
    )

});

export default stitch({ propTypes, contextTypes, render });
