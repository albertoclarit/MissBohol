'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;

import createComponent from 'helpers/createComponent';
import Index from 'components/Index.js';

describe('Index', () => {
    let IndexComponent;

    beforeEach(() => {
        IndexComponent = createComponent(Index);
    });

    it('should have its component name as default className', () => {
        expect(IndexComponent._store.props.className).toBe('Index');
    });
});
