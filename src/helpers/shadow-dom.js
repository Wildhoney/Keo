import React, { Component, PropTypes } from 'react';
import { render, findDOMNode } from 'react-dom';

/**
 * @class ShadowDOM
 * @extends Component
 */
export default class ShadowDOM extends Component {

    /**
     * @constant propTypes
     * @type {Object}
     */
    static propTypes = {
        component: PropTypes.node.isRequired,
        cssDocuments: PropTypes.oneOfType([PropTypes.string, PropTypes.array])
    };

    /**
     * @method componentDidMount
     * @return {void}
     */
    componentDidMount() {

        // Create the shadow root on the rendered component, and then render the passed in
        // component to the shadow DOM.
        const rootElement = this.refs.container;
        const shadowRoot = rootElement.createShadowRoot();
        render(this.props.component, shadowRoot);
        this.setState({ shadowRoot });

        // Fetch and attach the passed in stylesheets.
        this.props.cssDocuments && this.appendCSSDocuments(this.props.cssDocuments);
        
    }

    /**
     * @method componentDidUpdate
     * @return {void}
     */
    componentDidUpdate() {
        render(this.props.component, this.state.shadowRoot);
    }

    /**
     * @method appendCSSDocuments
     * @param cssDocuments {Array|String}
     * @return {void}
     */
    appendCSSDocuments(cssDocuments) {

        const styleElement = document.createElement('style');
        styleElement.setAttribute('type', 'text/css');
        const documents = Array.isArray(cssDocuments) ? cssDocuments : [cssDocuments];

        /**
         * @method fetchStylesheet
         * @param {String} document
         * @return {Promise}
         */
        const fetchStylesheet = document => fetch(document).then(response => response.text());

        /**
         * @method insertStyleElement
         * @param {Array} cssDocuments
         * @return {void}
         */
        const insertStyleElement = cssDocuments => {

            styleElement.innerHTML = cssDocuments.reduce((accumulator, document) => {
                return `${accumulator} ${document}`;
            });

            this.state.shadowRoot.appendChild(styleElement);

        };

        Promise.all(documents.map(fetchStylesheet)).then(insertStyleElement);

    }

    /**
     * @method render
     * @return {XML}
     */
    render() {
        return <this.props.component.type ref="container" />;
    }

}
