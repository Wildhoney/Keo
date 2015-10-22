import React from 'react';
import {render} from 'react-dom';
import Gremlin from '../../tests/components/Gremlin';

document.addEventListener('DOMContentLoaded', () => {
    render(<Gremlin name="Matilda" />, document.querySelector('section.gremlin'));
});
