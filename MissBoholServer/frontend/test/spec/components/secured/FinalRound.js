'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;

import createComponent from 'helpers/createComponent';
import FinalRound from 'components/secured/FinalRound.js';

describe('FinalRound', () => {
    let FinalRoundComponent;

    beforeEach(() => {
        FinalRoundComponent = createComponent(FinalRound);
    });

    it('should have its component name as default className', () => {
        expect(FinalRoundComponent._store.props.className).toBe('FinalRound');
    });
});
