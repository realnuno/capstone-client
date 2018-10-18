import React from 'react';
import {shallow, mount} from 'enzyme';

import EditItem from './edit-item';

describe('<EditItem />', () => {
    it('Renders without crashing', () => {
        shallow(<EditItem />);
    });
});