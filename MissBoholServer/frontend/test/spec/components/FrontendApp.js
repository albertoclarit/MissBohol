'use strict';

describe('FrontendApp', () => {
  let React = require('react/addons');
  let FrontendApp, component;

  beforeEach(() => {
    let container = document.createElement('div');
    container.id = 'content';
    document.body.appendChild(container);

    FrontendApp = require('components/FrontendApp.js');
    component = React.createElement(FrontendApp);
  });

  it('should create a new instance of FrontendApp', () => {
    expect(component).toBeDefined();
  });
});
