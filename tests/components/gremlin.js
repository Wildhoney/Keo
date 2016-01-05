import React from 'react';
import moment from 'moment';
import {stitch, compose, memoize, objectAssign, resolutionMap} from '../../src/keo';

/**
 * @method eatBrain
 * @return {Object}
 */
export const eatBrain = () => {
    return fetch('https://randomuser.me/api').then(response => response.json()).then(json => json.results[0].user);
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

    const eat = () => setState({ clicks: state.clicks + 1, humans: [...state.humans, eatBrain()] });

    const buttonLabel = props.resolving.humans ? 'Geolocating Human...' : `Eat Brain (${state.clicks} clicks)`;
    const asideLabel = state.humans.length ? `Zombie ${props.name} has devoured ${state.humans.length} humans in ${moment(state.time).fromNow(true)}.`
                                           : `Zombie ${props.name} is currently a pacifist.`;

    return (
        <main>

            <aside>
                {asideLabel}
            </aside>

            <button disabled={props.resolving.humans} className="eat-brain" onClick={eat}>
                {buttonLabel}
            </button>

            <ul className="humans" style={{ display: humans.length ? 'block' : 'none' }}>
                <li className="title">{humans.length} Devoured:</li>
                {humans}
            </ul>

        </main>
    );

});

export default stitch({ getInitialState, render });
