import apiService from "../../../api-utils/api-service";

const storeTranscribedData = (data) => {
  return apiService(`/api/v1/transcribe`, "POST", data);
};

const markImageAsUnclear = (id) => {
  return apiService(`/api/v1/transcribe/image/${id}/unclear`, "GET");
};

const markImageAsInvalid = (id) => {
  return apiService(`/api/v1/transcribe/image/${id}/invalid-form`, "GET");
};

const transcribeAPI = {
  storeTranscribedData,
  markImageAsUnclear,
  markImageAsInvalid,
};

export default transcribeAPI;
