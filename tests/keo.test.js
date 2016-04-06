import React, { PropTypes, createElement } from 'react';
import test from 'ava';
import configureStore from 'redux-mock-store';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import { compose } from 'ramda';
import isSymbol from 'is-symbol';
import { createRenderer } from 'react-addons-test-utils';
import { stitch, unwrap } from '../src/keo';

const createPerson = () => {

    const componentDidMount = spy();
    const componentWillMount = spy();
    const componentDidUpdate = spy();

    const component = {
        propTypes: {
            name: PropTypes.string
        },
        componentWillMount,
        componentDidMount,
        componentDidUpdate,
        render({ props }) {
            return <h1>{props.name}</h1>
        }
    };

    return { component, methods: { componentDidMount, componentWillMount, componentDidUpdate } };

};

test('is able to render a simple component without a `render` method;', t => {

    const { component } = createPerson();
    const Component = stitch(component.render);
    const wrapper = shallow(<Component name="Adam" />);
    t.is(wrapper.find('h1').text(), 'Adam');

});

test('is able to render a component with a `render` method', t => {

    const { component } = createPerson();
    const Component = stitch(component);
    const wrapper = shallow(<Component name="Maria" />);
    t.is(wrapper.find('h1').text(), 'Maria');

});

test('is able to invoke the React lifecycle methods', t => {

    const { component, methods } = createPerson();
    const Component = stitch(component);
    mount(<Component />);
    t.is(methods.componentDidMount.callCount, 1);
    t.is(methods.componentWillMount.callCount, 1);

});

test('is able to prevent access to the `this` context;', t => {

    const { component } = createPerson();

    const Component = stitch({ ...component, render({ args }) {
        t.true(this === undefined);
        return component.render({ ...args });
    }});

    mount(<Component />);

});

test('is only re-rendering when the component-specific properties change;', t => {

    const { component, methods } = createPerson();

    const Component = stitch(component);
    const wrapper = mount(<Component name="Adam" age="30" />);

    wrapper.setProps({ name: 'Maria' });
    t.is(wrapper.find('h1').text(), 'Maria');
    t.is(methods.componentDidUpdate.callCount, 1);

    wrapper.setProps({ age: 31 });
    t.is(wrapper.find('h1').text(), 'Maria');
    t.is(methods.componentDidUpdate.callCount, 1);

    wrapper.setProps({ name: 'Adam', age: 31 });
    t.is(wrapper.find('h1').text(), 'Adam');
    t.is(methods.componentDidUpdate.callCount, 2);

});

test('is able to pass a unique id for each component;', t => {

    let componentId;
    const { component } = createPerson();
    const Component = stitch({ ...component,
        componentWillMount: ({ id }) => {
            t.true(isSymbol(id));
            componentId = id;
        },
        componentDidMount: ({ id }) => {
            t.true(isSymbol(id));
            t.is(id, componentId);
        }
    });

    mount(<Component />);

});

test('is not able to update when overriding `shouldComponentUpdate` dictates;', t => {

    const { component } = createPerson();
    const Component = stitch({ ...component, shouldComponentUpdate: ({ nextProps }) => {
        return nextProps.name !== 'Terrence';
    }});

    const wrapper = mount(<Component name="Adam" />);
    t.is(wrapper.find('h1').text(), 'Adam');
    wrapper.setProps({ name: 'Maria' });
    t.is(wrapper.find('h1').text(), 'Maria');
    wrapper.setProps({ name: 'Terrence' });
    t.is(wrapper.find('h1').text(), 'Maria');

});

test('is able to unwrap `connect` from React Redux for testing purposes;', t => {

    const mockStore = configureStore([]);
    const store = mockStore({});

    const { component } = createPerson();
    const Component = unwrap(stitch(component, () => ({})));

    const wrapper = shallow(<Component store={store} name="Adam" />);
    t.is(wrapper.find('h1').text(), 'Adam');

});
