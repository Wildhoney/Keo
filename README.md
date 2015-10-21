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

At the core of Keo's philosophies is the notion that you **shouldn't** have to deal with the `this` keyword &mdash; and while in ES2015 the `this` keyword has become easier to manage, it seems wholly unncessary in a React component. As such, Keo takes a more [Deku](https://github.com/dekujs/deku) approach in that items such as `props`, `state`, `setState`, etc... are passed in to *some* React [lifecycle function](https://facebook.github.io/react/docs/component-specs.html) methods. With that approach, you can easily destructure the arguments.

```javascript
const componentDidMount = ({ setState }) => {
    setState({ lifeRemaining: Math.floor(Math.random() * 10) + 1 });
};
```

## Setting State

Ideally your methods that aren't React-specific should be pure functions that you pass arguments to &ndash; this makes them a whole lot easier to test.

```javascript
export const eatBrain = name => {
    return { current: `${name} is now tiring. Eating brain... Nom, nom, nom!` };
};
```

Given the `eatBrain` method, we can easily test it in isolation using `import {eatBrain} ...` without having to worry about React, because we're not invoking React functions &ndash; such as `setState`. Whilst there's nothing to prevent you from passing `setState` into the `eatBrains` method, in Keo we *recommend* that you return an object from `eatBrains` and then invoke `setState` from within the `render` method &ndash; a method which **is** directly coupled to the React infrastructure.

```javascript
<button onClick={() => setState(eatBrain('Jacob'))}>
    Eat Brain
</button>
```

## Component Exporting

Once you have created your component, Keo encourages that you `export` **all** functions so that you can test each one individually, but **demands** that you `export` the lifecycle functions by invoking `keo.stitch`.

```javascript
import {stitch} from '../../src/Keo';
// ...
export default stitch({ componentDidMount, render });
```

As such your exporting component will now be a valid `React.createClass` component that you can pass around, such as importing it for [React router](https://github.com/rackt/react-router).
