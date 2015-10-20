import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {findDOMNode} from 'react-dom';
import Gremlin from './components/Gremlin';

describe('Keo', () => {

    it('Should be able to render the component;', () => {

        const name     = 'Adam is using Keo!';
        const instance = TestUtils.renderIntoDocument(<Gremlin name={name} />);
        const header   = TestUtils.findRenderedDOMComponentWithTag(instance, 'h1');
        expect(findDOMNode(header).textContent).toBe(name);

    });

});
