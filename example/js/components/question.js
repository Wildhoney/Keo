import React, { PropTypes } from 'react';
import shuffle from 'array-shuffle';
import { compose, partial } from 'ramda';
import hash from 'object-hash';
import { fetchCountry, setAnswer } from '../actions';
import { stitch, shadow } from '../../../src/keo';

/**
 * @constant MAXIMUM_CHOICES
 * @type {Number}
 */
const MAXIMUM_CHOICES = 4;

/**
 * @constant propTypes
 * @type {Object}
 */
const propTypes = {
    country: PropTypes.object.isRequired,
    countries: PropTypes.array.isRequired
};

/**
 * @method render
 * @param {Object} props
 * @param {Function} dispatch
 * @return {XML}
 */
const render = compose(({ props, dispatch }) => {

    const countries = shuffle([ ...props.countries ]);
    const answers = [ props.country.capital, ...countries.filter(x => x.name !== props.country.name).slice(0, MAXIMUM_CHOICES - 1).map(x => x.capital) ];
    const sendAnswer = compose(() => dispatch(fetchCountry()), name => dispatch(setAnswer(name)));

    return (
        <section className="capitals">

            { props.country.name && `What is the capital of ${props.country.name}?` }

            <ul>

                {answers.map(name => {

                    return (
                        <li key={hash({ name })} onClick={() => sendAnswer(name)}>
                            {name}
                        </li>
                    );

                })}

            </ul>

        </section>
    );

});

export default stitch({ propTypes, render });
