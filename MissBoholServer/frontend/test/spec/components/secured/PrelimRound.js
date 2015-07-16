'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;

import createComponent from 'helpers/createComponent';
import PrelimRound from 'components/secured/PrelimRound.js';

describe('PrelimRound', () => {
    let PrelimRoundComponent;

    beforeEach(() => {
        PrelimRoundComponent = createComponent(PrelimRound);
    });

    it('should have its component name as default className', () => {
        expect(PrelimRoundComponent._store.props.className).toBe('PrelimRound');
    });
});
