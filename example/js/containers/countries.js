import React, { PropTypes } from 'react';
import { compose } from 'ramda';
import isEmpty from 'is-empty-object';
import { stitch, shadow } from '../../../src/keo';
import { fetchCountries, fetchCountry } from '../actions';
import Question from '../components/question';

/**
 * @constant PropTypes
 * @type {Object}
 */
const propTypes = {
    answers: PropTypes.array.isRequired,
    country: PropTypes.object.isRequired,
    countries: PropTypes.array.isRequired
};

/**
 * @method componentDidMount
 * @param {Function} dispatch
 * @return {void}
 */
const componentDidMount = ({ dispatch }) => {
    dispatch(fetchCountries());
};

/**
 * @method componentDidUpdate
 * @param {Object} props
 * @param {Function} dispatch
 * @return {void}
 */
const componentDidUpdate = ({ props, dispatch }) => {
    isEmpty(props.country) && dispatch(fetchCountry());
};

/**
 * @method render
 * @param {Object} props
 * @return {XML}
 */
const render = compose(shadow, ({ props }) => {

    const [answer] = props.answers;
    const correct = props.answers.filter(x => x.isCorrect);

    const hasCountry = x => !correct.find(a => a.name === x.name);
    const remainingCountries = props.countries.filter(hasCountry);

    return (
        <section>
            <h1>You have got { correct.length } of { props.countries.length } correct</h1>
            <h2 className={ answer ? (answer.isCorrect ? 'correct' : 'incorrect') : '' }>
                { props.answers.length ? `Previous answer was ${answer.capital}` : '-' }
            </h2>
            <Question {...props} countries={remainingCountries} />
        </section>
    );

});

export default stitch({ propTypes, componentDidMount, componentDidUpdate, render }, state => state);
