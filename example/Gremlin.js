/**
 * @method findHuman
 * @return {Boolean}
 */
export const findHuman = () => {
    return Math.random() > 0.5;
};

/**
 * @method render
 * @param {Object} props
 * @return {XML}
 */
export function render({ props }) => {

    return (
        <article>
            <h1>{props.name}</h1>
            <button onClick={() => findHuman()} />
        </article>
    );

}
