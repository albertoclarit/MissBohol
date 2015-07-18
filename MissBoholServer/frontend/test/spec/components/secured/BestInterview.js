'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;

import createComponent from 'helpers/createComponent';
import BestInterview from 'components/secured/BestInterview.js';

describe('BestInterview', () => {
    let BestInterviewComponent;

    beforeEach(() => {
        BestInterviewComponent = createComponent(BestInterview);
    });

    it('should have its component name as default className', () => {
        expect(BestInterviewComponent._store.props.className).toBe('BestInterview');
    });
});
