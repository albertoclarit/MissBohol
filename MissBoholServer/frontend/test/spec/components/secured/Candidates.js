'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;

import createComponent from 'helpers/createComponent';
import Candidates from 'components/secured/Candidates.js';

describe('Candidates', () => {
    let CandidatesComponent;

    beforeEach(() => {
        CandidatesComponent = createComponent(Candidates);
    });

    it('should have its component name as default className', () => {
        expect(CandidatesComponent._store.props.className).toBe('Candidates');
    });
});
