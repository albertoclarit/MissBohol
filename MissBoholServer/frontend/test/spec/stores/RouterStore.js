'use strict';

describe('RouterStore', () => {
  let store;

  beforeEach(() => {
    store = require('stores/RouterStore.js');
  });

  it('should be defined', () => {
    expect(store).toBeDefined();
  });
});
