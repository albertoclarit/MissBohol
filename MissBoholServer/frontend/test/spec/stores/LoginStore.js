'use strict';

describe('LoginStore', () => {
  let store;

  beforeEach(() => {
    store = require('stores/LoginStore.js');
  });

  it('should be defined', () => {
    expect(store).toBeDefined();
  });
});
