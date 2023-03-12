import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import transcribeAPI from "./transcribeAPI";

const initialState = {
  data: [],
};

export const storeTranscribedDataAsync = createAsyncThunk(
  "transcribe/store",
  async (data) => {
    const response = await transcribeAPI.storeTranscribedData(data);
    return response.data;
  }
);

export const markImageAsUnclearAsync = createAsyncThunk(
  "transcribe/unclear",
  async (data) => {
    const response = await transcribeAPI.markImageAsUnclear(data);
    return response.data;
  }
);

export const markImageAsInvalidAsync = createAsyncThunk(
  "transcribe/invalid",
  async (id) => {
    const response = await transcribeAPI.markImageAsInvalid(id);
    return response.data;
  }
);

export const storeTranscribedDataV2Async = createAsyncThunk(
  "transcribeV2/store",
  async (data) => {
    const response = await transcribeAPI.storeTranscribedDataV2(data);
    return response.data;
  }
);

export const markImageAsUnclearV2Async = createAsyncThunk(
  "transcribeV2/unclear",
  async (data) => {
    const response = await transcribeAPI.markImageAsUnclearV2(data);
    return response.data;
  }
);

export const markImageAsInvalidV2Async = createAsyncThunk(
  "transcribeV2/invalid",
  async (id) => {
    const response = await transcribeAPI.markImageAsInvalidV2(id);
    return response.data;
  }
);

export const transcribeSlice = createSlice({
  name: "pollingUnits",
  initialState,
  reducers: {},
  extraReducers: {
    [storeTranscribedDataAsync.fulfilled]: (state, action) => {
      state.data = action.payload;
    },
  },
});

export default transcribeSlice.reducer;
