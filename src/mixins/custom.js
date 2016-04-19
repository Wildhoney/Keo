/**
 * @param {Object} component
 * @return {Object}
 */
export default (component => {

    /**
     * @method isValid
     * @param {String} name
     * @return {Boolean}
     */
    const isValid = name => /[a-z]\-[a-z]/i.test(name);

    /**
     * @method register
     * @param {Object} childComponent
     * @return {Object}
     */
    const register = childComponent => {

        // Attempt to register the custom element if it's considered a valid tag.
        const isRegistered = document.createElement(childComponent.type).constructor !== HTMLElement;
        isValid(component.type) && !isRegistered && document.registerElement(component.type);

        if (!childComponent.props.children || !Array.isArray(childComponent.props.children)) {
            return component;
        }

        // Register each child of the current component.
        childComponent.props.children.forEach(register);

    };

    return register(component);

});
