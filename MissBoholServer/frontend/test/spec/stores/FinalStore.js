'use strict';

describe('FinalStore', () => {
  let store;

  beforeEach(() => {
    store = require('stores/FinalStore.js');
  });

  it('should be defined', () => {
    expect(store).toBeDefined();
  });
});
