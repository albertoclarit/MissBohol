'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;

import createComponent from 'helpers/createComponent';
import JudgeFrontend from 'components/JudgeFrontend.js';

describe('JudgeFrontend', () => {
    let JudgeFrontendComponent;

    beforeEach(() => {
        JudgeFrontendComponent = createComponent(JudgeFrontend);
    });

    it('should have its component name as default className', () => {
        expect(JudgeFrontendComponent._store.props.className).toBe('JudgeFrontend');
    });
});
