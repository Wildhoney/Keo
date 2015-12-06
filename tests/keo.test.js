import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {findDOMNode} from 'react-dom';
import Gremlin from './components/gremlin';
import {compose, stitch, wrap} from '../src/keo';
import {stitch as s} from '../dist/keo';

console.log(s);

describe('Keo', () => {

    it('Should be able to compose state and dispatch;', () => {

        const mocks = {
            setState: () => {},
            dispatch: () => {}
        };

        spyOn(mocks, 'setState').and.callThrough();
        spyOn(mocks, 'dispatch').and.callThrough();

        const render = () => {

            const drinkAndDispatch = compose(
                state => mocks.setState(state),
                event => mocks.dispatch(event)
            );

            return <button onClick={() => drinkAndDispatch()}>Drink Me</button>;

        };

        const Component = stitch({ render });
        const instance  = TestUtils.renderIntoDocument(<Component />);
        const button    = TestUtils.findRenderedDOMComponentWithTag(instance, 'button');

        TestUtils.Simulate.click(findDOMNode(button));

        expect(mocks.setState).toHaveBeenCalled();
        expect(mocks.dispatch).toHaveBeenCalled();

    });

    it('Should be able to assume render function was passed in when only a function is passed to stitch;', () => {

        const render    = () => <h1>Daffodil</h1>;
        const Component = stitch(render);
        const instance  = TestUtils.renderIntoDocument(<Component />);

        expect(TestUtils.isCompositeComponent(instance)).toBeTruthy();

    });

    it('Should be able to wrap a function in an object, otherwise return the object;', () => {

        const mockObject   = { componentDidMount: () => {}, render: () => {} };
        const mockFunction = () => {};

        expect(wrap(mockObject)).toEqual(mockObject);
        expect(wrap(mockFunction).render).toEqual(mockFunction);

    });

    it('Should be able to compose from left-to-right;', () => {

        const calculate = compose(
            x => x + 1,
            x => x * 2
        );

        expect(calculate(5)).toEqual(12);

    });

    it('Should be able to render and interact with a React component;', () => {

        const name     = 'Matilda';
        const instance = TestUtils.renderIntoDocument(<Gremlin name={name} />);

        const h1       = TestUtils.findRenderedDOMComponentWithTag(instance, 'h1');
        const h2       = TestUtils.findRenderedDOMComponentWithTag(instance, 'h2');
        const buttons  = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button');

        expect(findDOMNode(h1).textContent).toBe(`Señorita Zombie ${name.toUpperCase()}`);
        expect(findDOMNode(h2).textContent).toBe('Human Brain Intact: Kinda!');

        expect(instance.state).toEqual({
            lifeRemaining: jasmine.any(Number)
        });

        TestUtils.Simulate.click(findDOMNode(buttons[0]));

        expect(instance.state).toEqual({
            name: 'Jeremiah',
            lifeRemaining: jasmine.any(Number),
            current: 'We have Jeremiah in our grips, but he is resisting our advances.'
        });

        TestUtils.Simulate.click(findDOMNode(buttons[1]));

        expect(findDOMNode(h2).textContent).toBe('Human Brain Intact: Auf Wiedersehen, Brain.');
        expect(instance.state).toEqual({
            name: '',
            lifeRemaining: 0,
            current: 'Jeremiah is now tiring. Eating brain... Nom, nom, nom!'
        });

    });

});
