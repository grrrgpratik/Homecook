const types = {
    UPDATE_CURRENT_LOCATION: "UPDATE_CURRENT_LOCATION",
  };

export const actions = {
    updateCurrentLocation : (long, lat, actualLocation ) =>{
        return { type: types.UPDATE_CURRENT_LOCATION, payload: {long, lat, actualLocation}}
    }
}

const initialState = {
    longitude: null,
    latitude: null,
    actualLocation: "Searching..."
  };

  export const reducer = (state = initialState, action) => {
    const { type, payload} = action;
  
    switch (type) {
      case types.UPDATE_CURRENT_LOCATION:
        return Object.assign({}, state, {
          longitude: payload.long,
          latitude: payload.lat,
          actualLocation: payload.actualLocation
        });
      default:
        return state;
    }
  };
  
  