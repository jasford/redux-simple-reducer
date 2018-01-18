/**
 * Create a reducer function from a map of action functions and initial state.
 *
 * @param {Object} initialState - initial state for the reducer.
 * @param {Object} actionMap - map of functions to go with each action type.
 * @param {string} prefix - optional prefix to go before keys in actionMap
 *   e.g. if action types are all prefixed like "cart.getIt" you could set
 *   prefix to "cart" and simply set actionMap keys to things like "getIt".
 */
module.exports = (initialState, actions, prefix) => {
  // Add a couple pre-set actions to the action map.
  const actionMap = Object.assign({
    // Set an individual value in the object designated by prefix.
    setValue: (state, action) => Object.assign({}, state, {
      [action.payload.key]: action.payload.value,
    }),

    // Set multiple values in the object designated by prefix.
    setValues: (state, action) =>
      Object.assign({}, state, action.payload),
  }, actions);

  // Primary new reducer function that we're creating, receives state and
  // action just like all redux reducers.
  return (state = initialState, action) => {
    // Get action key from action.type, removing matching prefix if provided.
    let key = action.type;
    if (prefix) {
      // Split the action string into its dot-separated parts.
      const [actionPrefix, actionKey] = key.split('.');

      // If the prefix doesn't match, or we don't have an action key after
      // the prefix and dot, then we can't process. Return state unchanged.
      if (actionPrefix !== prefix || !actionKey) {
        return state;
      }

      // Set the action key to just the part of the action type after the dot.
      key = actionKey;
    }

    // If the action type exists in actionMap, run it and return result.
    if (Object.prototype.hasOwnProperty.call(actionMap, key)) {
      return actionMap[key](state, action);
    }

    // If the action type was not found, simply return the existing state.
    return state;
  };
};
