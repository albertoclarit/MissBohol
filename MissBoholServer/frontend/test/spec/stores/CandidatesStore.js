'use strict';

describe('CandidatesStore', () => {
  let store;

  beforeEach(() => {
    store = require('stores/CandidatesStore.js');
  });

  it('should be defined', () => {
    expect(store).toBeDefined();
  });
});
