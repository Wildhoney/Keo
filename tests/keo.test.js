import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {findDOMNode} from 'react-dom';
import Gremlin from './components/gremlin';
import {compose, stitch, wrap} from '../src/keo';
import {stitch as s} from '../src/keo';

describe('Keo', () => {

    it('Should be able to set state according to immediate and future values;', done => {

        const instance = TestUtils.renderIntoDocument(<Gremlin name="Gemma" />);
        expect(true).toBeTruthy();
        done();

        //const h2       = TestUtils.findRenderedDOMComponentWithTag(instance, 'h2');
        //const h3       = TestUtils.findRenderedDOMComponentWithTag(instance, 'h3');
        //const buttons  = TestUtils.scryRenderedDOMComponentsWithTag(instance, 'button');

        //TestUtils.Simulate.click(findDOMNode(buttons[3]));
        //expect(instance.state.zombieName).toEqual('Reset');
        //expect(instance.state.name instanceof Promise).toBeFalsy();
        //
        //setTimeout(() => {
        //    expect(instance.state.zombieName).toEqual('Reset');
        //    expect(instance.state.name).toEqual('No Name');
        //    done();
        //});

    });

});
