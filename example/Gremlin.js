/**
 * @method findHuman
 * @return {Object|Boolean}
 */
export const findHuman = () => {
    const human = { name: 'Adam', age: 30 };
    return (Math.random() > 0.5) ? { human } : false;
};

/**
 * @method eatBrain
 * @param {Object} human
 * @return {void}
 */
export const eatBrain = human => {

    if (human) {
        console.log(`Eating brain of ${human.name}. Nom, nom, nom!`);
    }

};

/**
 * @method render
 * @param {Object} props
 * @param {Object} state
 * @param {Function} setState
 * @return {XML}
 */
export function render({ props, state, setState }) => {

    return (
        <article>
            <h1>{props.name}</h1>
            <button onClick={() => setState(findHuman())}>Find Human</button>
            <button onClick={() => eatBrain(state.human)}>Eat Brain</button>
        </article>
    );

}
