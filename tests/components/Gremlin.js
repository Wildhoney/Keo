import React from 'react';
import {stitch, compose} from '../../src/Keo';

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
 * @method validate
 * @param {Object} args
 * @return {Object}
 */
const validate = args => {

    const humanStillBreathing = args.state.lifeRemaining > 0;

    return Object.assign({}, args, {
        state: { ...args.state, humanStillBreathing }
    });

};

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
const render = compose(validate, ({ props, state, setState }) => {

    return (
        <article>
            <h1>{props.name}</h1>
            <button onClick={() => setState(findHuman())}>Find Human</button>
            <button onClick={() => setState(eatBrain(state.name))}>Eat Brain</button>
        </article>
    );

});

export default stitch({ componentWillMount, render });
