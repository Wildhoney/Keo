import React from 'react';
import { render } from 'react-dom';
import Zombie from './zombie';

document.addEventListener('DOMContentLoaded', () => {
    render(<Zombie name="Matilda" />, document.querySelector('section.zombie'));
});
