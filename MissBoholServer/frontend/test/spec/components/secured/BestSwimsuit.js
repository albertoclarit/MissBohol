'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;

import createComponent from 'helpers/createComponent';
import BestSwimsuit from 'components/secured/BestSwimsuit.js';

describe('BestSwimsuit', () => {
    let BestSwimsuitComponent;

    beforeEach(() => {
        BestSwimsuitComponent = createComponent(BestSwimsuit);
    });

    it('should have its component name as default className', () => {
        expect(BestSwimsuitComponent._store.props.className).toBe('BestSwimsuit');
    });
});
