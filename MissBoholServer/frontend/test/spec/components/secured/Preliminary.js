'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;

import createComponent from 'helpers/createComponent';
import Preliminary from 'components/secured/Preliminary.js';

describe('Preliminary', () => {
    let PreliminaryComponent;

    beforeEach(() => {
        PreliminaryComponent = createComponent(Preliminary);
    });

    it('should have its component name as default className', () => {
        expect(PreliminaryComponent._store.props.className).toBe('Preliminary');
    });
});
