import React from 'react';
import {stitch, compose, memoize} from '../../src/Keo';

/**
 * @method findHuman
 * @return {Object}
 */
export const findHuman = () => {
    const name = 'Jeremiah';
    return { name, current: `We have ${name} in our grips, but he is resisting our advances.` };
};

/**
 * @method eatBrain
 * @param {Object} name
 * @return {Object}
 */
export const eatBrain = name => {
    return { current: `${name} is now tiring. Eating brain... Nom, nom, nom!`, lifeRemaining: 0 };
};

/**
 * @method hasBrain
 * @param {Object} args
 * @return {Object}
 */
const hasBrain = args => {

    const brainIntact = args.state.lifeRemaining > 0;

    return Object.assign({}, args, {
        state: { ...args.state, brainIntact }
    });

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
 * @method componentWillMount
 * @param {Function} setState
 * @return {void}
 */
const componentWillMount = ({ setState }) => {
    setState({ lifeRemaining: Math.floor(Math.random() * 10) + 1 });
};

/**
 * @method render
 * @param {Object} props
 * @param {Object} state
 * @param {Function} setState
 * @return {XML}
 */
const render = compose(hasBrain, ({ props, state, setState }) => {

    return (
        <article>
            <h1>Señorita Zombie {capitaliseName(props.name)}</h1>
            <h2>Brain Intact: { state.brainIntact ? 'Kinda!' : 'Auf Wiedersehen, Brain.' }</h2>
            <button onClick={() => setState(findHuman())}>Find Human</button>
            <button onClick={() => setState(eatBrain(state.name))}>Eat Brain</button>
        </article>
    );

});

export default stitch({ componentWillMount, render });
