'use strict';

// Uncomment the following lines to use the react test utilities
// import React from 'react/addons';
// const TestUtils = React.addons.TestUtils;

import createComponent from 'helpers/createComponent';
import Template from 'components/Template.js';

describe('Template', () => {
    let TemplateComponent;

    beforeEach(() => {
        TemplateComponent = createComponent(Template);
    });

    it('should have its component name as default className', () => {
        expect(TemplateComponent._store.props.className).toBe('Template');
    });
});
