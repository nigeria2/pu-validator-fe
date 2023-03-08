import { combineReducers } from "@reduxjs/toolkit";
import localGovermentSlice from "./features/localGovernment/localGovernmentSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer } from "redux-persist";
import pollingUnitSlice from "./features/pollingUnit/pollingUnitSlice";
import transcribeSlice from "./features/transcribe/transcribeSlice";
import authSlice from "./features/auth/authSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

const rootReducers = combineReducers({
  lgas: localGovermentSlice,
  pollingUnits: pollingUnitSlice,
  transcribe: transcribeSlice,
  auth: authSlice,
});

const persistedReducer = persistReducer(persistConfig, rootReducers);

export default persistedReducer;
