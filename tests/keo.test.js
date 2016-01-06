import jsdom from 'jsdom';
import test from 'ava';
import {shallow, mount, describeWithDOM} from 'enzyme';
import React from 'react';
import TestUtils from 'react-addons-test-utils';
import {findDOMNode} from 'react-dom';

import 'babel-core/register';
import {compose, stitch, wrap} from '../src/keo';

import DefaultProps from './mocks/default-props';
import StateImmediate from './mocks/state-immediate';
import StateFuture from './mocks/state-future';
import StateMixed from './mocks/state-mixed';

// Setup JSDOM manually because we don't use Mocha.
global.document = jsdom.jsdom('<!doctype html><html><body></body></html>');
global.window = global.document.defaultView;

test('is able to utilise getDefaultProps', t => {
    const component = mount(<DefaultProps />);
    t.is(component.props().name, 'Geraldine');
});

test('is able to set an immediate state', t => {
    const component = shallow(<StateImmediate />);
    component.find('button').simulate('click');
    t.is(component.state().name, 'Matilda');
});

test.cb('is able to set an immediate state', t => {
    const component = shallow(<StateFuture />);
    component.find('button').simulate('click');
    setTimeout(() => {
        t.is(component.state().name, 'Spencer');
        t.end();
    });
});

test.cb('is able to set future and immediate states', t => {
    const component = shallow(<StateFuture />);
    component.find('button').simulate('click');
    setTimeout(() => {
        t.is(component.state().name, 'Spencer');
        t.end();
    });
});

test.cb('is able to set future and immediate states', t => {
    const component = shallow(<StateMixed />);
    component.find('button').simulate('click');
    t.same(component.state(), { age: 45, friends: true });
    setTimeout(() => {
        const equals = { name: 'Donovan', age: 45, friends: true, visited: ['Argentina', 'Maldives', 'Brazil'] };
        t.same(component.state(), equals);
        t.end();
    });
});
