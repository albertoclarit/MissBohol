'use strict';

describe('PreliminaryStore', () => {
  let store;

  beforeEach(() => {
    store = require('stores/PreliminaryStore.js');
  });

  it('should be defined', () => {
    expect(store).toBeDefined();
  });
});
