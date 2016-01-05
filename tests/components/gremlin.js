import React from 'react';
import moment from 'moment';
import {stitch, compose, memoize, objectAssign} from '../../src/keo';

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
const render = ({ props, state, setState }) => {

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

    return (
        <main>

            <aside>
                {displayLine(props.name, state.humans, state.time)}
            </aside>

            <button className="eat-brain" onClick={() => setState({ humans: [...state.humans, eatBrain()] })}>
                Eat Brain
            </button>

            <ul className="humans">
                <li className="title">Devoured:</li>
                {humans}
            </ul>

        </main>
    );

};

export default stitch({ getInitialState, render });
