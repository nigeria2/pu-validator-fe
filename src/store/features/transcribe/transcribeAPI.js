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

const storeTranscribedDataV2 = (data) => {
  return apiService(`/api/v2/transcribe`, "POST", data);
};

const markImageAsUnclearV2 = (id) => {
  return apiService(`/api/v2/transcribe/image/${id}/unclear`, "GET");
};

const markImageAsInvalidV2 = (id) => {
  return apiService(`/api/v2/transcribe/image/${id}/invalid-form`, "GET");
};

const transcribeAPI = {
  storeTranscribedData,
  markImageAsUnclear,
  markImageAsInvalid,
  storeTranscribedDataV2,
  markImageAsUnclearV2,
  markImageAsInvalidV2,
};

export default transcribeAPI;
