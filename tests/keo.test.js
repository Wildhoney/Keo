import React, { PropTypes, createElement } from 'react';
import test from 'ava';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import starwars from 'starwars';
import { stitch } from '../src/keo';

test('is able to render a simple component without a `render` method;', t => {
    const text = starwars();
    const Component = stitch(() => <h1>{text}</h1>);
    const wrapper = shallow(<Component />);
    t.is(wrapper.find('h1').text(), text);
});

test('is able to render a component with a `render` method', t => {
    const text = starwars();
    const Component = stitch({ render: () => <h1>{text}</h1> });
    const wrapper = shallow(<Component />);
    t.is(wrapper.find('h1').text(), text);
});

test('is able to render a component with `componentDidMount` hook', t => {
    const componentDidMountSpy = spy();
    const Component = stitch({ componentDidMount: componentDidMountSpy, render: () => <span /> });
    mount(<Component />);
    t.true(componentDidMountSpy.called);
});

test('is able to pass in properties to the component;', t => {
    const text = starwars();
    const Component = stitch({ render: ({ props }) => <h1>{props.quote}</h1> });
    const wrapper = mount(<Component quote={text} />);
    t.is(wrapper.find('h1').text(), text);
});

test('is able to remove `getInitialState` function;', t => {
    const text= starwars();
    const getInitialStateSpy = spy(() => ({ text }));
    const Component = stitch({ getInitialState: getInitialStateSpy, render: () => <span /> });
    const wrapper = mount(<Component />);
    t.false(getInitialStateSpy.called);
    t.true(wrapper.state() === null);
});

test('is able to prevent access to the `this` context;', t => {
    let context;
    const Component = stitch({ render: function() {
        context = this;
        return <span />
    }});
    mount(<Component />);
    t.true(context === undefined);
});

test('is not able to setState or access the state object;', t => {
    const props = {};
    const Component = stitch({ render: ({ state, setState }) => {
        props.state = state;
        props.setState = setState;
        return <span />
    }});
    mount(<Component />);
    t.true(props.state === undefined);
    t.true(props.setState === undefined);
});

// Skipped...

test.skip('is only re-rendering when the component-specific properties change;', t => {});
test.skip('is able to override the default `shouldComponentUpdate` behaviour;', t => {});
