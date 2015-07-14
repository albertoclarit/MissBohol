'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;

import createComponent from 'helpers/createComponent';
import JudgeForm from 'components/secured/judges/JudgeForm.js';

describe('JudgeForm', () => {
    let JudgeFormComponent;

    beforeEach(() => {
        JudgeFormComponent = createComponent(JudgeForm);
    });

    it('should have its component name as default className', () => {
        expect(JudgeFormComponent._store.props.className).toBe('JudgeForm');
    });
});
