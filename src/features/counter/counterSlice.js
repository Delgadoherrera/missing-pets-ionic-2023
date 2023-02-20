import { createSlice } from "@reduxjs/toolkit";

export const counterSlice = createSlice({
  name: "counter",
  initialState: {
    file: "",
    value: 0,
    newMarkerValue: [],
    formValue: {},
    myPets: {},
    petSelected:{}
  },
  reducers: {
    imageValue: (state, action) => {
      state.file = action.payload.base64String;
    },
    positionValue: (state, action) => {
      state.value = action.payload;
    },
    newMarkerValue: (state, action) => {
      state.newMarkerValue = [
        action.payload.latitude,
        action.payload.longitude,
      ];
    },
    formValue: (state, action) => {
      console.log(state,action)
      state.formValue = action.payload;
    },
    myPets: (state, action) => {
      console.log('myPetsDispatched:',action.payload)
      state.myPets = action.payload;
    },
    petSelected: (state, action) => {
      console.log('petSelectedDispatched',action.payload)
      state.petSelected = action.payload;
    },
  },
});

export const { imageValue, positionValue, newMarkerValue, formValue, myPets,petSelected } =
  counterSlice.actions;

// The function below is called a thunk and allows us to perform async logic. It
// can be dispatched like a regular action: `dispatch(incrementAsync(10))`. This
// will call the thunk with the `dispatch` function as the first argument. Async
// code can then be executed and other actions can be dispatched
export const incrementAsync = (amount) => (dispatch) => {
  setTimeout(() => {
    dispatch(newMarkerValue(amount));
  }, 1000);
};

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectCount = (state) => state.counter.file;
export const coordinates = (state) => state.counter.coords;
export const markerValue = (state) => state.counter.newMarkerValue;
export const formValues = (state) => state.counter.formValue;
export const allMyPets = (state) => state.counter.myPets;
export const selectPet = (state) => state.counter.petSelected;

export default counterSlice.reducer;
