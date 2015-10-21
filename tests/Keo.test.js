import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {findDOMNode} from 'react-dom';
import Gremlin from './components/Gremlin';

describe('Keo', () => {

    it('Should be able to render and interact with the component;', () => {

        const name     = 'Matilda';
        const instance = TestUtils.renderIntoDocument(<Gremlin name={name} />);

        const h1      = TestUtils.findRenderedDOMComponentWithTag(instance, 'h1');
        const h2      = TestUtils.findRenderedDOMComponentWithTag(instance, 'h2');
        const buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button');

        expect(findDOMNode(h1).textContent).toBe(`Señorita Zombie ${name.toUpperCase()}`);
        expect(findDOMNode(h2).textContent).toBe('Brain Intact: Kinda!');

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

        expect(findDOMNode(h2).textContent).toBe('Brain Intact: Auf Wiedersehen, Brain.');
        expect(instance.state).toEqual({
            name: 'Jeremiah',
            lifeRemaining: 0,
            current: 'Jeremiah is now tiring. Eating brain... Nom, nom, nom!'
        });

    });

});
