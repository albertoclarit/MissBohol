'use strict';

describe('BestGownStore', () => {
  let store;

  beforeEach(() => {
    store = require('stores/BestGownStore.js');
  });

  it('should be defined', () => {
    expect(store).toBeDefined();
  });
});
