'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;

import createComponent from 'helpers/createComponent';
import Final from 'components/secured/Final.js';

describe('Final', () => {
    let FinalComponent;

    beforeEach(() => {
        FinalComponent = createComponent(Final);
    });

    it('should have its component name as default className', () => {
        expect(FinalComponent._store.props.className).toBe('Final');
    });
});
