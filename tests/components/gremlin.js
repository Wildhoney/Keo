import React from 'react';
import {stitch, compose, memoize, objectAssign} from '../../src/keo';

/**
 * @method findHuman
 * @return {Object}
 */
export const findHuman = () => {
    const name = 'Jeremiah';
    return { name, lifeRemaining: randomLife(),
             current: `We have ${name} in our grips, but he is resisting our advances.` };
};

/**
 * @method eatBrain
 * @param {Object} name
 * @return {Object}
 */
export const eatBrain = name => {
    return { name: '', current: `${name} is now tiring. Eating brain... Nom, nom, nom!`, lifeRemaining: 0 };
};

/**
 * @method capitaliseName
 * @param {String} name
 * @return {String}
 */
export const capitaliseName = memoize(name => {
    return name.toUpperCase();
});

/**
 * @method randomLife
 * @return {Number}
 */
export const randomLife = () => {
    return Math.floor(Math.random() * 10) + 1;
};

/**
 * @method findZombieName
 * @return {Promise}
 */
export const findZombieName = () => {
    return Promise.resolve({ zombieName: 'Janice' });
};

/**
 * @method hasBrain
 * @param {Object} args
 * @return {Object}
 */
const hasBrain = args => {

    const brainIntact = args.state.lifeRemaining > 0;

    return objectAssign({}, args, {
        state: { ...args.state, brainIntact }
    });

};

/**
 * @method componentWillMount
 * @param {Function} setState
 * @return {void}
 */
const componentWillMount = ({ setState }) => {
    setState({ lifeRemaining: randomLife() });
};

/**
 * @method render
 * @param {Object} props
 * @param {Object} state
 * @param {Function} setState
 * @return {XML}
 */
const render = compose(hasBrain, ({ props, state, setState, dispatch }) => {

    const setNameAndDispatch = compose(
        state => setState(state),
        event => dispatch(event)
    );

    return (
        <article>
            <h1>Señorita Zombie {capitaliseName(props.name)}</h1>
            <h2>Human Brain Intact: { state.brainIntact ? 'Kinda!' : 'Auf Wiedersehen, Brain.' }</h2>
            <h3>Zombie Name: { state.zombieName || 'Unavailable...' }</h3>
            <button onClick={() => setState(findHuman())}>Find Human</button>
            <button onClick={() => setNameAndDispatch(eatBrain(state.name))} disabled={!state.name}>Eat Brain</button>
            <button onClick={() => setState(findZombieName())}>Zombie's Name</button>
            <button onClick={() => setState({ zombieName: 'Reset', name: Promise.resolve('No Name') })}>Reset</button>
        </article>
    );

});

export default stitch({ componentWillMount, render });
