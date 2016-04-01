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
        const rootElement = this.refs.container;
        const shadowRoot = rootElement.createShadowRoot();
        render(this.props.component, shadowRoot);
        this.setState({ shadowRoot });
        this.props.cssDocuments && this.appendCSSDocuments(this.props.cssDocuments);
    }

    appendCSSDocuments(cssDocuments) {

        const styleElement = document.createElement('style');
        styleElement.setAttribute('type', 'text/css');
        const documents = Array.isArray(cssDocuments) ? cssDocuments : [cssDocuments];

        /**
         * @method fetchStylesheets
         * @param {String} document
         * @return {Promise}
         */
        const fetchStylesheets = document => fetch(document).then(response => response.text());

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

        Promise.all(documents.map(fetchStylesheets)).then(insertStyleElement);

    }

    /**
     * @method componentDidUpdate
     * @return {void}
     */
    componentDidUpdate() {
        render(this.props.component, this.state.shadowRoot);
    }

    /**
     * @method render
     * @return {XML}
     */
    render() {
        return <main ref="container" />;
    }

}
