
const types = {
  UPDATE_CONNECTION_STATUS: "UPDATE_CONNECTION_STATUS",
};

export const actions = {
  updateConnectionStatus: (isConnected) => {
    return { type: types.UPDATE_CONNECTION_STATUS, isConnected };
  },
};

const initialState = {
  isConnected: true,
};

export const reducer = (state = initialState, action) => {
  const { type } = action;

  switch (type) {
    case types.UPDATE_CONNECTION_STATUS:
      return Object.assign({}, state, {
        isConnected: action.isConnected,
      });
    default:
      return state;
  }
};
