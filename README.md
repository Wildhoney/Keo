<img src="media/logo.png" alt="Keo" width="250" />

> <sub><sup>*["Keo"](https://vi.wikipedia.org/wiki/Keo) is the Vietnamese translation for glue.*</sup></sub><br />
> Plain functions for a more functional approach to creating React components, with functional goodies such as compose, memoize, etc... for free.

![Travis](http://img.shields.io/travis/Wildhoney/Keo.svg?style=flat-square)
&nbsp;
![npm](http://img.shields.io/npm/v/keo.svg?style=flat-square)
&nbsp;
![License MIT](http://img.shields.io/badge/License-MIT-lightgrey.svg?style=flat-square)

* **npm:** `npm install keo`

---

## Advantages

* Steer away from `class` sugaring, inheritance, and `super` calls;
* Create referentially transparent, pure functions without `this`;
* Gain `memoize`, `compose`, et cetera... for gratis with previous;
* Reduce boilerplate by getting rid of `extends React.Component`;
* Use `export` to export plain functions for simpler unit-testing;
* Simple composing of functions for [*mixin* support](https://github.com/dekujs/deku/issues/174);
* :bulb: Future &mdash; In-built support for [Redux](https://github.com/rackt/redux);

## Destructuring

At the core of Keo's philosophies is the notion that you **shouldn't** have to deal with the `this` keyword &mdash; and while in ES2015 the `this` keyword has become easier to manage, it seems wholly unnecessary in a React component. As such, Keo takes a more [Deku](https://github.com/dekujs/deku) approach in that items such as `props`, `state`, `setState`, etc... are passed in to *some* React [lifecycle methods](https://facebook.github.io/react/docs/component-specs.html).

With this approach, you can easily destructure the arguments you require.

```javascript
const componentDidMount = ({ setState }) => {
    setState({ lifeRemaining: Math.floor(Math.random() * 10) + 1 });
};
```

## Setting State

Ideally your methods that aren't directly related to React should be pure functions that you pass arguments to &ndash; this makes them a whole lot easier to test, and techniques such as `memoize` come along for free.

```javascript
export const eatBrain = name => {
    return { current: `${name} is now tiring. Eating brain... Nom, nom, nom!` };
};
```

Given the `eatBrain` method, we can easily test in isolation using `import {eatBrain} ...` without having to worry about React, because we're not invoking React functions &ndash; such as `setState`.

Whilst there's nothing to prevent you from passing `setState` into the `eatBrains` method, in Keo we *recommend* that you return an object from `eatBrains` and then invoke `setState` from within the `render` method &ndash; a method which **is** directly coupled to the React infrastructure.

```javascript
<button onClick={() => setState(eatBrain('Jacob'))}>
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

By creating pure functions you are able to optimise your code &ndash; in this case by using the `memoize` method which is part of Keo. Given a function that **always** returns the same when given the same parameters &mdash; a pure function &mdash; `memoize` is able to cache the return value to prevent further invocations of the function &mdash; this is especially useful when the function is quite expensive &mdash; unlike the following example.

```javascript
export const capitaliseName = memoize(name => {
    return name.toUpperCase();
});
```

As the `capitaliseName` function returns the same value when given the same `name`, we can cache its result making future invocations quicker. With `memoize` we see performance gains at the expense of memory allocation.
