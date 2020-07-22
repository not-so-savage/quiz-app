import App from './App';
import { shallow } from 'enzyme';
import React from 'react';

describe('site', () => {
    it('renders without crashing', () => {
        shallow(<App />);
    })
})
