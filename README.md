<img src="media/logo.png" alt="Keo" width="250" />

> <sub><sup>*["Keo"](https://vi.wikipedia.org/wiki/Keo) is the Vietnamese translation for glue.*</sup></sub><br />
> Plain functions for a more functional [Deku](https://github.com/dekujs/deku) approach to creating React components, with functional goodies such as compose, memoize, etc... for free.

![Travis](http://img.shields.io/travis/Wildhoney/Keo.svg?style=flat-square)
&nbsp;
![npm](http://img.shields.io/npm/v/keo.svg?style=flat-square)
&nbsp;
![License MIT](http://img.shields.io/badge/License-MIT-lightgrey.svg?style=flat-square)

* **npm:** `npm install keo --save`

---

## Advantages

* Steer away from `class` sugaring, inheritance, and `super` calls;
* Create referentially transparent, pure functions without `this`;
* Gain `memoize`, `compose`, et cetera... for gratis with previous;
* Use `export` to export plain functions for simpler unit-testing;
* Simple composing of functions for [*mixin* support](https://github.com/dekujs/deku/issues/174);
* Avoid functions being littered with React specific method calls;

<img src="media/screenshot.png" />

## Destructuring

At the core of Keo's philosophies is the notion that you **shouldn't** have to deal with the `this` keyword &mdash; and while in ES2015 the `this` keyword has become easier to manage, it seems wholly unnecessary in a React component. As such, Keo takes a more [Deku](https://github.com/dekujs/deku) approach in that items such as `props`, `state`, `setState`, etc... are passed in to [*some*](lifecycle-functions) React [lifecycle functions](https://facebook.github.io/react/docs/component-specs.html).

With this approach, you can easily destructure the arguments you require.

```javascript
const componentDidMount = ({ setState }) => {
    setState({ lifeRemaining: Math.floor(Math.random() * 10) + 1 });
};
```

##### Lifecycle Functions

Following functions receive `props`, `state`, `setState`, `dispatch` etc... as an object which can be destructured:

* `componentWillMount`
* `componentDidMount`
* `componentWillUnmount`
* `render`

## Setting State

Ideally your functions that aren't directly related to React should be pure functions that you pass arguments to &ndash; this makes them a whole lot easier to test, and techniques such as `memoize` come along for free.

```javascript
export const eatBrain = name => {
    return { current: `${name} is now tiring. Eating brain... Nom, nom, nom!` };
};
```

Given the `eatBrain` function, we can easily test in isolation using `import {eatBrain} ...` without having to worry about React, because we're not invoking React functions &ndash; such as `setState`.

Whilst there's nothing to prevent you from passing `setState` into the `eatBrains` function, in Keo we *recommend* that you return an object from `eatBrains` and then invoke `setState` from within the `render` function &ndash; a function which **is** directly coupled to the React infrastructure.

```javascript
<button onClick={() => setState(eatBrain('Jacob'))}>
    Eat Brain
</button>
```

It's worth noting that Keo wraps the `setState` method to prevent you from setting the state to `null` which would otherwise throw an error in React &ndash; this allows you to return `undefined/null` and **still** use `setState` on your actions.

```javascript
export const eatBrain = name => {
    return name ? { current: `Eating ${name}'s brain... Nom, nom, nom!` } : null;
};
```

In the above example returning `null` when there's no `name` will prevent `setState` from being invoked.

### Setting State & Dispatching

In certain circumstances you may wish to `setState` and `dispatch` within your function &mdash; for this you could `compose`, especially in more complex situations &mdash; however for a simple `setState` and `dispatch` Keo provides the `setStateDispatch` helper function. With the `setStateDispatch` function, you simply return a tuple from your function &ndash; the first parameter will be the state, and the second parameter will be what's dispatched.

```javascript
export const eatBrain = name => {
    return [
        { current: `${name} is now tiring. Eating brain... Nom, nom, nom!`, lifeRemaining: 0 },
        { name: '' }
    ];
};
```

You can then destructure the `setStateDispatch` in your `render` function and use it instead of `setState`/`dispatch`.

```javascript
<button onClick={() => setStateDispatch(eatBrain(state.name))}>
    Eat Brain
</button>
```

## Exporting

Once you have created your component, Keo encourages you to `export` **all** functions so that you can test each one individually, but **demands** that you `export` the lifecycle functions by invoking `keo.stitch`.

```javascript
import {stitch} from 'keo';
// ...
export default stitch({ componentDidMount, render });
```

As such, your exported component will now be a valid `React.createClass` component that you can pass around, such as importing it for [React router](https://github.com/rackt/react-router).

## Lifecycle Composing

With the [demise of mixins](https://medium.com/@dan_abramov/mixins-are-dead-long-live-higher-order-components-94a0d2f9e750#.dfr92o4yg) in React, and the gradual trend towards favouring composition, Keo makes it simple to compose the lifecycle functions to add additional behaviour.

As an example, suppose you have a `hasBrain` component that you wish to use in numerous React components &mdash; all that your `hasBrain` component is required to do is to pass on the arguments that were passed to it! Additionally, the `hasBrain` component should be pure &mdash; without side effects &mdash; and most importantly, **not** mutate those arguments that were entrusted to it by Keo.

If you're familiar with [Redux](https://github.com/rackt/redux) then the function may seem familiar.

```javascript
const hasBrain = args => {

    const brainIntact = args.state.lifeRemaining > 0;

    return Object.assign({}, args, {
        state: { ...args.state, brainIntact }
    });

};
```

By using the `hasBrain` above in the `compose` function in conjunction with our component's `render` function, we can pass in `brainIntact` as part of the `state` object.

```javascript
const render = compose(hasBrain, ({ state }) => {

    return (
        <h1>
            Brain Intact?
            {state.brainIntact ? 'Probably' : 'Doubtful'}!
        </h1>
    );

});
```

An important aspect to note is that the Keo `compose` function composes from left-to-right, because this allows you to have your **actual** lifecycle function as the final argument, making it much more readable &mdash; in Keo's opinion.

## Memoize

By creating pure functions you are able to optimise your code &ndash; in this case by using the `memoize` function which is part of Keo. Given a function that **always** returns the same when given the same parameters &mdash; a pure function &mdash; `memoize` is able to cache the return value to prevent further invocations of the function &mdash; this is especially useful when the function is quite expensive &mdash; unlike the following example.

```javascript
export const capitaliseName = memoize(name => {
    return name.toUpperCase();
});
```

As the `capitaliseName` function returns the same value when given the same `name`, we can cache its result making future invocations quicker. With `memoize` we see performance gains at the expense of memory allocation.

## Redux

Using Redux with Keo is straightforward &ndash; Keo provides a `keo/redux` adapter for handling Redux in a more succinct fashion &mdash; instead of importing `keo` you can instead import the `keo/redux` adapter and use the `stitch` function from there instead.

```javascript
import {stitch} from 'keo/redux';
// ...
export default stitch({ componentWillMount, render }, state => state.zombies);
```

With the remaining arguments you can specify the options &mdash; [see `react-redux`'s documentation](https://github.com/rackt/react-redux/blob/master/docs/api.md#connectmapstatetoprops-mapdispatchtoprops-mergeprops-options) &mdash; anything passed into the remaining arguments are used in the invocation of [`react-redux`](https://github.com/rackt/react-redux)'s `connect` function.

For further information on connecting to Redux, see [Redux's documentation](http://rackt.org/redux/docs/basics/UsageWithReact.html).
