'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;

import createComponent from 'helpers/createComponent';
import Unauthorized from 'components/public/Unauthorized.js';

describe('Unauthorized', () => {
    let UnauthorizedComponent;

    beforeEach(() => {
        UnauthorizedComponent = createComponent(Unauthorized);
    });

    it('should have its component name as default className', () => {
        expect(UnauthorizedComponent._store.props.className).toBe('Unauthorized');
    });
});
