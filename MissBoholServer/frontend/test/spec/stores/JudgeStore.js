'use strict';

describe('JudgeStore', () => {
  let store;

  beforeEach(() => {
    store = require('stores/JudgeStore.js');
  });

  it('should be defined', () => {
    expect(store).toBeDefined();
  });
});
