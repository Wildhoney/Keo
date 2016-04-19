import { get as fetch } from 'axios';
import React, { Component, PropTypes, createElement, DOM } from 'react';
import { render, findDOMNode } from 'react-dom';
import { dissoc } from 'ramda';

/**
 * @class ShadowDOM
 * @extends Component
 */
class ShadowDOM extends Component {

    /**
     * @constant propTypes
     * @type {Object}
     */
    static propTypes = {
        component: PropTypes.node.isRequired,
        cssDocuments: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
    };

    /**
     * @constructor
     */
    constructor() {
        super();
        this.state = { resolving: false };
    }

    /**
     * @method getContainer
     * @return {Object}
     */
    getContainer() {

        // Wrap children in a container if it's an array of children, otherwise
        // simply render the single child which is a valid `ReactElement` instance.
        const children = this.props.component.props.children;
        return children.length ? <span>{children}</span> : children;

    }

    /**
     * @method componentDidMount
     * @return {void}
     */
    componentDidMount() {

        // Create the shadow root and take the CSS documents from props.
        // todo: Prefer `attachShadow` if supported by the current browser.
        const root = findDOMNode(this).createShadowRoot({ mode: 'open' });
        const cssDocuments = this.props.cssDocuments;
        const container = this.getContainer();

        // Render the passed in component to the shadow root, and then `setState` if there
        // are no CSS documents to be resolved.
        render(container, root);
        !cssDocuments && this.setState({ root });

        if (cssDocuments.length) {

            // Otherwise we'll fetch and attach the passed in stylesheets which need to be
            // resolved before `state.resolved` becomes `true` again.
            this.setState({ resolving: true, root });
            this.attachStylesheets(this.props.cssDocuments);

        }

    }

    /**
     * @method componentDidUpdate
     * @return {void}
     */
    componentDidUpdate() {

        // Updates consist of simply rendering the container element into the shadow root
        // again, as the `this.getContainer()` element contains the passed in component's
        // children.
        render(this.getContainer(), this.state.root);

    }

    /**
     * @method attachStylesheets
     * @param cssDocuments {Array|String}
     * @return {void}
     */
    attachStylesheets(cssDocuments) {

        const styleElement = document.createElement('style');
        styleElement.setAttribute('type', 'text/css');
        const documents = Array.isArray(cssDocuments) ? cssDocuments : [cssDocuments];

        /**
         * @method fetchStylesheet
         * @param {String} document
         * @return {Promise}
         */
        const fetchStylesheet = document => fetch(document).then(response => response.data);

        /**
         * @method insertStyleElement
         * @param {Array} cssDocuments
         * @return {void}
         */
        const insertStyleElement = cssDocuments => {

            styleElement.innerHTML = cssDocuments.reduce((accumulator, document) => {
                return `${accumulator} ${document}`;
            });

            this.state.root.appendChild(styleElement);

        };

        Promise.all(documents.map(fetchStylesheet)).then(cssDocuments => {
            insertStyleElement(cssDocuments);
            this.setState({ resolving: false });
        });

    }

    /**
     * @method render
     * @return {XML}
     */
    render() {

        // Take all of the props from the passed in component, minus the `children` props
        // as that's handled by `componentDidMount`.
        const props = dissoc('children', this.props.component.props);
        const className = this.state.resolving ? 'resolving' : 'resolved';

        // Determine whether to use `class` or `className`, as custom elements do not allow
        // for `className`. See: https://github.com/facebook/react/issues/4933
        const classNames = `${props.className ? props.className : ''} ${className}`.trim();
        const isSupportedElement = this.props.component.type in DOM;
        const propName = isSupportedElement ? 'className' : 'class';

        return <this.props.component.type {...{ ...dissoc('className', props), [propName]: classNames }} />;

    }

}

/**
 * @param {Array|String} [cssDocuments = []]
 * @return {Function}
 */
export default (cssDocuments = []) => {

    /**
     * @param {Object} component
     * @return {XML}
     */
    return component => <ShadowDOM { ...{ cssDocuments, component }} />;

};
