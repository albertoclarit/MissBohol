'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;

import createComponent from 'helpers/createComponent';
import Login from 'components/public/Login.js';

describe('Login', () => {
    let LoginComponent;

    beforeEach(() => {
        LoginComponent = createComponent(Login);
    });

    it('should have its component name as default className', () => {
        expect(LoginComponent._store.props.className).toBe('Login');
    });
});
