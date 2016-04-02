<img src="media/logo.png" alt="Keo" width="250" />

> <sub><sup>*["Keo"](https://vi.wikipedia.org/wiki/Keo) is the Vietnamese translation for glue.*</sup></sub><br />
> Plain functions for a more functional [Deku](https://github.com/dekujs/deku) approach to creating React components, with functional goodies such as compose, memoize, etc... for free.

---

# Shadow DOM

By using function composition in Keo, you are able to add additional behaviour to your functions by using `compose` or `pipe` &ndash; in this case we are using the in-built `shadow` function to enable [Shadow DOM](https://developer.mozilla.org/en-US/docs/Web/Web_Components/Shadow_DOM) in React.

![Shadow DOM](../media/shadow-dom.png)

## Composition

In order to use Shadow DOM you need to `compose` your `render` function, which means importing [`compose`](http://ramdajs.com/0.19.1/docs/#compose) &mdash; or [`pipe`](http://ramdajs.com/0.19.1/docs/#pipe) &mdash; from Ramda, along with `shadow` from Keo and then composing your `render` function.

```javascript
import { compose } from 'ramda';
import { stitch, shadow } from 'keo';

// ...

const render = compose(shadow(), ({ props }) => {
    return (
        <section>
            <h1>Hello ${props.name}</h1>
        </section>
    );
});
```

Once you have the composition setup with `shadow` you should find your DOM rendering with a shadow root. Keo takes the root element's tag name &mdash; in the above case it's `section` &mdash; and appends that to the DOM tree, it then creates a shadow root and renders your component inside of there. You should see the following when inspecting the DOM:

```html
<section>
    #shadow-root (open)
        <section>
            <h1>Hello Adam</h1>
        </section>
</section>
```

Any event listeners on your root `section` element will be transferred across to the `#shadow-root` element and therefore work as you would expect &mdash; the first `section` is simply a container for the shadow root.

## Styling

You may have noticed that when composing your `render` function that you're invoking `shadow` instead of simply passing it in &ndash; that is because the `shadow` function is curried and accepts **two** arguments: the first being a `string` or an `array` of stylesheets, and the second being the result of your `render` function which `compose` &mdash; or `pipe` &mdash; will handle.

Therefore to pass in stylesheets to be used with your component, simply pass in a path to your CSS document(s):

```javascript
const render = compose(shadow('/css/greeting.css'), ({ props }) => {
    return (
        <section>
            <h1>Hello ${props.name}</h1>
        </section>
    );
});
```

We've mentioned that you could also use `pipe` to place the `shadow` function at the end for readability purposes &mdash; whichever you choose is entirely up to you &mdash; but don't forget to be consistent across components!

```javascript
import { pipe } from 'ramda';
import { stitch, shadow } from 'keo';

// ...

const render = pipe(({ props }) => {
    return (
        <section>
            <h1>Hello ${props.name}</h1>
        </section>
    );
}, shadow(['/css/greeting.css', '/css/headers.css']));
```

# Polyfill

As Shadow DOM is part of the [webcomponents](https://developer.mozilla.org/en-US/docs/Web/Web_Components) suite, there is a [useful polyfill](https://github.com/webcomponents/webcomponentsjs) which you can use for wider browser support &mdash; please refer to their documentation for a [list of supported browsers](https://github.com/webcomponents/webcomponentsjs#browser-support).