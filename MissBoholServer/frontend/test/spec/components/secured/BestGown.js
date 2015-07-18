'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;

import createComponent from 'helpers/createComponent';
import BestGown from 'components/secured/BestGown.js';

describe('BestGown', () => {
    let BestGownComponent;

    beforeEach(() => {
        BestGownComponent = createComponent(BestGown);
    });

    it('should have its component name as default className', () => {
        expect(BestGownComponent._store.props.className).toBe('BestGown');
    });
});
