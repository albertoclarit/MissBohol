'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;

import createComponent from 'helpers/createComponent';
import PreliminaryEditRow from 'components/secured/PreliminaryEditRow.js';

describe('PreliminaryEditRow', () => {
    let PreliminaryEditRowComponent;

    beforeEach(() => {
        PreliminaryEditRowComponent = createComponent(PreliminaryEditRow);
    });

    it('should have its component name as default className', () => {
        expect(PreliminaryEditRowComponent._store.props.className).toBe('PreliminaryEditRow');
    });
});
