'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;

import createComponent from 'helpers/createComponent';
import CandidateForm from 'components/secured/candidates/CandidateForm.js';

describe('CandidateForm', () => {
    let CandidateFormComponent;

    beforeEach(() => {
        CandidateFormComponent = createComponent(CandidateForm);
    });

    it('should have its component name as default className', () => {
        expect(CandidateFormComponent._store.props.className).toBe('CandidateForm');
    });
});
