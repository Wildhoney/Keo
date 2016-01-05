import React from 'react';
import moment from 'moment';
import {stitch, compose, memoize, objectAssign, resolutionMap} from '../../src/keo';

/**
 * @method eatBrain
 * @return {Object}
 */
export const eatBrain = () => {
    return fetch('https://randomuser.me/api/').then(response => response.json()).then(json => json.results[0].user);
};

/**
 * @method displayLine
 * @param {String} name
 * @param {Array} humans
 * @param {Number} time
 * @return {string}
 */
const displayLine = (name, humans, time) => {
    return humans.length ? `Zombie ${name} has devoured ${humans.length} humans ${moment(time).fromNow()}.`
                         : `Zombie ${name} is currently a pacifist.`;
};

/**
 * @method getInitialState
 * @return {Object}
 */
const getInitialState = () => {
    return {
        clicks: 0,
        humans: [],
        time: Date.now()
    };
};

/**
 * @method render
 * @param {Object} props
 * @param {Object} state
 * @param {Function} setState
 * @return {XML}
 */
const render = compose(resolutionMap, ({ props, state, setState }) => {

    const humans = state.humans.map(human => {

        return (
            <li key={human.md5}>
                <img src={human.picture.thumbnail} alt={`${human.name.first}'s avatar`} />
                <h2>
                    {human.name.first}
                    <label>({moment().diff(human.dob, 'years')} years old)</label>
                </h2>
            </li>
        );

    });

    /**
     * @method eat
     * @return {void}
     */
    const eat = () => {
        setState({ clicks: state.clicks + 1, humans: [...state.humans, eatBrain()] });
    };

    return (
        <main>

            <aside>
                {displayLine(props.name, state.humans, state.time)}
            </aside>

            <button disabled={props.resolving.get('humans')} className="eat-brain" onClick={() => eat()}>
                Eat Brain ({state.clicks} clicks)
            </button>

            <ul className="humans">
                <li className="title">{humans.length} Devoured:</li>
                {humans}
            </ul>

        </main>
    );

});

export default stitch({ getInitialState, render });
