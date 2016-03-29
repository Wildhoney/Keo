import React, { PropTypes, createElement } from 'react';
import test from 'ava';
import { shallow, mount } from 'enzyme';
import { spy } from 'sinon';
import starwars from 'starwars';
import { stitch } from '../src/keo';
import isSymbol from 'is-symbol';

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
    const text = starwars();
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

test('is only re-rendering when the component-specific properties change;', t => {

    const renderSpy = spy(({ props }) => <div><h1>{props.quote}</h1><datetime>{props.dateTime}</datetime></div>);
    const Component = stitch({ propTypes: { quote: PropTypes.string.isRequired }, render: renderSpy });

    const date = Date.now();
    const initialText = starwars();
    const wrapper = mount(<Component quote={initialText} dateTime={date} />);

    t.is(renderSpy.callCount, 1);
    t.is(wrapper.find('h1').text(), initialText);
    t.is(wrapper.find('datetime').text(), String(date));

    const changedText = starwars();
    wrapper.setProps({ quote: changedText });
    t.is(renderSpy.callCount, 2);
    t.is(wrapper.find('h1').text(), changedText);
    t.is(wrapper.find('datetime').text(), String(date));

    wrapper.setProps({ dateTime: 'Invalid Date' });
    t.is(renderSpy.callCount, 2);
    t.is(wrapper.find('h1').text(), changedText);
    t.is(wrapper.find('datetime').text(), String(date));

});

test('is able to override the default `shouldComponentUpdate` behaviour;', t => {

    const renderSpy = spy(({ props }) => <div><h1>{props.quote}</h1><datetime>{props.dateTime}</datetime></div>);
    const Component = stitch({ propTypes: { programmeName: PropTypes.string }, shouldComponentUpdate: () => true, render: renderSpy });

    const initialText = starwars();
    const wrapper = mount(<Component quote={initialText} />);

    t.is(renderSpy.callCount, 1);
    t.is(wrapper.find('h1').text(), initialText);

    const changedText = starwars();
    wrapper.setProps({ quote: changedText });

    t.is(renderSpy.callCount, 2);
    t.is(wrapper.find('h1').text(), changedText);

});

test('is able to pass in correct arguments to `shouldComponentUpdate`', t => {

    const initialText = starwars();
    const updatedText = starwars();

    const shouldComponentUpdateSpy = spy(({ props, nextProps }) => {
        t.same(props, { text: initialText });
        t.same(nextProps, { text: updatedText });
        return true;
    });

    const Component = stitch({
        shouldComponentUpdate: shouldComponentUpdateSpy,
        render: ({ props }) => <h1>{props.text}</h1>
    });

    const wrapper = shallow(<Component text={initialText} />);
    t.is(wrapper.find('h1').text(), initialText);

    wrapper.setProps({ text: updatedText });
    t.is(shouldComponentUpdateSpy.callCount, 1);

});

test('is able to pass a unique id for each component;', t => {

    let componentUpdateId;

    const Component = stitch({
        componentWillMount: ({ id }) => {
            t.true(isSymbol(id));
            componentUpdateId = id;
        },
        render: ({ id }) => {
            t.is(id, componentUpdateId);
            return <span />;
        }
    });

    mount(<Component />);

});
