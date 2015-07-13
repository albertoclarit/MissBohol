'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;

import createComponent from 'helpers/createComponent';
import Judges from 'components/secured/Judges.js';

describe('Judges', () => {
    let JudgesComponent;

    beforeEach(() => {
        JudgesComponent = createComponent(Judges);
    });

    it('should have its component name as default className', () => {
        expect(JudgesComponent._store.props.className).toBe('Judges');
    });
});
