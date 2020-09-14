const initialState = {
  notes: [
    {
      title: "Tytuł",
      text: "Siema",
    },
  ],
};

const rootReducer = (state = initialState, action) => {
  console.log(state);
};

export default rootReducer;
