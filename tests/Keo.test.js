import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {findDOMNode} from 'react-dom';
import Gremlin from './components/Gremlin';

describe('Keo', () => {

    it('Should be able to render and interact with the component;', () => {

        const name     = 'We will find humans to consume!';
        const instance = TestUtils.renderIntoDocument(<Gremlin name={name} />);

        const header   = TestUtils.findRenderedDOMComponentWithTag(instance, 'h1');
        const buttons = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button');

        expect(findDOMNode(header).textContent).toBe(name);

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

        expect(instance.state).toEqual({
            name: 'Jeremiah',
            lifeRemaining: 0,
            current: 'Jeremiah is now tiring. Eating brain... Nom, nom, nom!'
        });

    });

});
