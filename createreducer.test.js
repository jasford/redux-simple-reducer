const { combineReducers } = require('redux');

const createreducer = require('./createreducer');

describe('createreducer', () => {
  test('Creates reducer from action function map.', () => {
    // Set up new countApp reducer using createreducer.
    const countApp = createreducer(100, {
      addNumber: (state, action) => state + action.number,
      double: state => state * 2,
    });

    // Initialze with a bogus action type and no initial value.
    let count = countApp(undefined, { type: '@init' });
    expect(count).toEqual(100);

    // Add 5 to the count using the count.addNumber action.
    count = countApp(count, { type: 'addNumber', number: 5 });
    expect(count).toEqual(105);

    // Double the count using the count.double action.
    count = countApp(count, { type: 'double' });
    expect(count).toEqual(210);
  });

  test('Supports dot-separated prefix for action types.', () => {
    // Set up new countApp reducer using createreducer.
    const countApp = createreducer(100, {
      addNumber: (state, action) => state + action.number,
      double: state => state * 2,
    }, 'count');

    // Initialze with a bogus action type and no initial value.
    let count = countApp(undefined, { type: '@init' });
    expect(count).toEqual(100);

    // Add 5 to the count using the count.addNumber action.
    count = countApp(count, { type: 'count.addNumber', number: 5 });
    expect(count).toEqual(105);

    // Double the count using the count.double action.
    count = countApp(count, { type: 'count.double' });
    expect(count).toEqual(210);

    // Failing to use the prefix does nothing.
    count = countApp(count, { type: 'double' });
    expect(count).toEqual(210);
  });

  test('Adds default setValue method', () => {
    const reducer = combineReducers({ test: createreducer({}, {}, 'test') });
    expect(reducer({ test: { hi: 'hello' } }, {
      payload: { key: 'awesome', value: 'yes' },
      type: 'test.setValue',
    })).toMatchSnapshot();
  });

  test('Adds default setValues method', () => {
    const reducer = combineReducers({ test: createreducer({}, {}, 'test') });
    expect(reducer({ test: { existing: 'value' } }, {
      payload: {
        hi: 'hi there',
        awesome: 'yes, it is',
      },
      type: 'test.setValues',
    })).toMatchSnapshot();
  });
});
