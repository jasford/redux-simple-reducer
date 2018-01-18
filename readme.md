## createreducer
Create a redux reducer function from a map of action functions and initial
state. Optionally add a prefix to all actions.

### Usage
```js
// Individual functions for reducer (in separate files, but don't have to be).
import addAlert from './addAlert';
import removeAlert from './removeAlert';

// Initial state for reducer.
const initialState = {
  alerts: [],
};

// Create combined reducer function with 'site' prefix, so our actions will
// actually be named `site-addAlert` and `site-removeAlert`.
const reducer = createReducer(initialState, {
  addAlert,
  removeAlert,
}, 'site');
```

The `prefix` argument ('site' in the example above) is optional. If you include
it, we join the prefix string to the object key with a hyphen to set the
reducer type values. If you do not include it, we simply use your object keys.
