import styled from "styled-components";
import { useState } from "react";
import { useDispatch } from "react-redux";
import ReCAPTCHA from "react-google-recaptcha";
import { getLocalGovernmentsAsync } from "../../../store/features/localGovernment";
import { pollingUnitsAsync } from "../../../store/features/pollingUnit";
import { CheckBox, Flex } from "../../atoms";
// import { Loader } from "../../atoms/Loader";
import { VoteInput } from "../../molecules/VoteInput";
import { RadioInput } from "../../atoms/RadioInput";
// import { DropDownInput } from "../../molecules/DropdownInput";
import {
  serializeLGAData,
  // serializePartiesDataForSubmission,
  serializePollingUnitData,
  serializeStatesData,
} from "../../../utils/serializeData";
import { Button } from "../../atoms/Button";

import pdpImg from "../../../assets/svgs/pdp.svg";
import apcImg from "../../../assets/svgs/apc.svg";
import adpImg from "../../../assets/svgs/adp.svg";
import apgaImg from "../../../assets/svgs/apga.svg";
import lpImg from "../../../assets/svgs/lp.svg";
import nnpcImg from "../../../assets/svgs/nnpp.svg";
// import {
//   storeTranscribedDataV2Async,
//   markImageAsInvalidAsync,
//   markImageAsUnclearAsync,
// } from "../../../store/features/transcribe";
import { toast } from "react-toastify";
import { ComboBox } from "../../molecules";
import { getAllowedParties } from "../../../utils/getAllowedParties";
import { sanitizeInputString } from "../../../utils/sanitizeString";
// import Modal from "../Modal";

export const partiesInfo = [
  {
    id: 1,
    name: "PDP",
    img: pdpImg,
  },
  {
    id: "2",
    name: "APC",
    img: apcImg,
  },

  {
    id: "3",
    name: "ADP",
    img: adpImg,
  },

  {
    id: "4",
    name: "APGA",
    img: apgaImg,
  },

  {
    id: "5",
    name: "LP",
    img: lpImg,
  },
  {
    id: "6",
    name: "NNPP",
    img: nnpcImg,
  },
];

const DroopdownWrapper = styled.div`
  margin-bottom: 10px;
`;
const PartiesInputSection = styled.section``;
const addScoreKeyToPartyInfo = (parties) => {
  const newParties = [...parties];
  return newParties?.map((party) => {
    return {
      ...party,
      score: "",
      is_not_signed: false,
    };
  });
};

export const FormSectionV2 = ({ data, refetch }) => {
  // const imageURLArray = data.image.url.split("/");
  // console.log("imageURLArray", imageURLArray);
  const ALLOWED_PARTIES = getAllowedParties(data.parties);
  // const [isNotPresidentialForm, setIsNotPresidentialForm] = useState(false);
  const [isNotStamped, setIsNotStamped] = useState(false);
  // const [recaptchaDone, setRecaptchaDone] = useState(false);
  // const [recaptchaValue, setRecaptchaValue] = useState(null);
  const [state, setState] = useState(null);
  const [lga, setLGA] = useState(null);
  const [pollingUnit, setPollingUnit] = useState(null);
  // const [isFormCorrect, setIsFormCorrect] = useState(null);
  const [pollValues, setPollValues] = useState(
    addScoreKeyToPartyInfo(ALLOWED_PARTIES)
  );
  // const session_id = localStorage.getItem("session_id");
  const [localGovernments, setLocalGovernments] = useState([]);
  const [pollingUnits, setPollingUnits] = useState([]);
  // const [showModal, setShowModal] = useState(false);

  const dispatch = useDispatch();

  // const refetchData = () => {
  //   // window.setTimeout(() => refetch(), 2000);
  //   window.setTimeout(() => window.location.reload(), 2000);
  // };

  function handleRecaptcha(value) {
    if (value) {
      // setRecaptchaValue(value);
      // setRecaptchaDone(true);
    } else {
      // setRecaptchaDone(false);
    }
  }

  const handleInputChange = (e) => {
    setPollValues((prev) => {
      const partyIndex = prev.findIndex((party) => {
        return party.id + "" === e.target.name;
      });
      const newArray = [...prev];
      newArray[partyIndex].score = +sanitizeInputString(e.target.value);
      return newArray;
    });
  };

  const handleSignedInputChange = async (e) => {
    const partyIndex = pollValues.findIndex((party) => {
      return party.id + "" === e.target.name;
    });
    pollValues[partyIndex].is_not_signed =
      !pollValues[partyIndex].is_not_signed;
  };

  const handleStateChange = async (e, newValue) => {
    setState(newValue);
    // console.log("newValue", newValue);
    const result = await dispatch(getLocalGovernmentsAsync(newValue.id));
    if (result.payload) {
      setLocalGovernments(result.payload);
    }
  };

  const markImageAsUnclear = async () => {
    toast.info("We are no longer accepting submissions");
    // const response = await dispatch(markImageAsUnclearAsync(data.image.id));
    // if (response.payload) {
    //   toast.success("Fetching new image...");
    //   refetchData();
    // } else {
    //   toast.error("Failed to mark image as unclear");
    // }
    //     toast.error("You cannot perform this action yet");
  };

  const markImageAsInvalid = async () => {
    toast.info("We are no longer accepting submissions");
    // const response = await dispatch(markImageAsInvalidAsync(data.image.id));
    // if (response.payload) {
    //   toast.success("Fetching new image...");
    //   refetchData();
    // } else {
    //   toast.error("Failed to flag image as invalid");
    // }
    //     toast.error("You cannot perform this action yet");
  };

  const handleLGAChange = async (e, newValue) => {
    setLGA(newValue);
    const result = await dispatch(pollingUnitsAsync(newValue.id));
    if (result.payload) {
      setPollingUnits(result.payload);
      // do polling unti preselection logic here and setPollingUnit here too
    }
  };

  const handlePollingUnitChange = async (e, newValue) => {
    // console.log("polling unit", newValue);
    setPollingUnit(newValue);
  };

  const handleIsFormCorrect = (e) => {
    // setIsFormCorrect(e.target.value);
  };

  // const handleisNotPresidentialForm = () => {
  //   setIsNotPresidentialForm((prev) => !prev);
  // };

  // const handleisUnclear = () => {
  //   setIsUnclear((prev) => !prev);
  // };

  const handleisNotStamped = () => {
    setIsNotStamped((prev) => !prev);
  };

  const prepareSubmissionData = async () => {
    toast.info("We are no longer accepting submissions");
    // if (!state) {
    //   toast.error("Please select state");
    // } else if (!lga) {
    //   toast.error("Please select LGA");
    // } else if (!pollingUnit) {
    //   toast.error("Please select polling unit");
    // } else if (isFormCorrect === null) {
    //   toast.error("Please let us know if the form is intact or not");
    // } else if (recaptchaValue === null) {
    //   toast.error("You must verify your identity to continue");
    // } else {
    //   const transcriptionData = {
    //     polling_unit_id: pollingUnit.id,
    //     image_id: data.image.id,
    //     has_corrections:
    //       isFormCorrect === "true" || isFormCorrect === true ? true : false,
    //     // g_recaptcha_response: recaptchaValue,
    //     state_id: state.id,
    //     lga_id: lga.id,
    //     is_not_stamped: isNotStamped,
    //     parties: serializePartiesDataForSubmission(pollValues),
    //   };
    //   if (session_id) transcriptionData.session_id = session_id;
    //   const response = await dispatch(
    //     storeTranscribedDataV2Async(transcriptionData)
    //   );
    //   if (response.payload) {
    //     if (!session_id)
    //       localStorage.setItem("session_id", response.payload.session_id);
    //     setShowModal(true);
    //     // toast.success("Data submitted successfully");
    //     refetchData();
    //   } else {
    //     toast.error("An error occured!");
    //   }
    //   //       toast.error("we are yet to start v2 validation!");
    // }
  };

  return (
    <>
      {/* <Modal isActive={showModal} /> */}
      <section style={{ margin: "0 0 32px 0" }}>
        <h3 style={{ margin: "0 0 10px 0" }}>Registration Area</h3>
        <DroopdownWrapper>
          <ComboBox
            data={data ? serializeStatesData(data.states) : []}
            label="Select state"
            value={state}
            onChange={handleStateChange}
          />
        </DroopdownWrapper>
        <DroopdownWrapper>
          <ComboBox
            data={
              localGovernments.length ? serializeLGAData(localGovernments) : []
            }
            label="Select LGA"
            value={lga}
            onChange={handleLGAChange}
          />
        </DroopdownWrapper>
        <DroopdownWrapper>
          <ComboBox
            data={
              pollingUnits.length ? serializePollingUnitData(pollingUnits) : []
            }
            label="Identify polling unit"
            value={pollingUnit}
            onChange={handlePollingUnitChange}
          />
        </DroopdownWrapper>
      </section>

      <PartiesInputSection>
        {pollValues.map((data, idx) => (
          <div key={idx}>
            <VoteInput
              type="text"
              keyValue={`${idx}-input`}
              name={data.id}
              partyName={data.name}
              icon={data.icon}
              value={data.score}
              onChange={handleInputChange}
            />
            <CheckBox
              keyValue={`${idx}-checkbox`}
              name={data.id}
              onChange={handleSignedInputChange}
              label={`${data.name} representative did not sign this form.`}
              value={data.score}
            />
          </div>
        ))}
      </PartiesInputSection>

      <section style={{ margin: "10px 0" }}>
        <p style={{ fontWeight: 500 }}>
          Do you think this form has been tampered with?
        </p>

        <div>
          <RadioInput
            name="form_correctness"
            label="Yes, there are corrections on this form"
            value={true}
            onChange={handleIsFormCorrect}
          />
          <RadioInput
            name="form_correctness"
            label="No, the form is intact"
            value={false}
            onChange={handleIsFormCorrect}
          />
          {/* <CheckBox
            name="isNotPresidentialForm"
            label="This is not a presidential form"
            value={isNotPresidentialForm}
            onChange={handleisNotPresidentialForm}
          /> */}
          {/* <CheckBox
            name="isUnclear"
            label="This document is unclear"
            value={isUnclear}
            onChange={handleisUnclear}
          /> */}
          <CheckBox
            name="isNotStamped"
            label="This form is not stamped"
            value={isNotStamped}
            onChange={handleisNotStamped}
          />
        </div>
      </section>

      <ReCAPTCHA
        sitekey={process.env.REACT_APP_RECAPTCHA_PUBLIC_KEY}
        onChange={handleRecaptcha}
      />

      <Flex justifyContent="space-between">
        {/* <Button
          onClick={markImageAsUnclear}
          backgroundColor="#C8C8C8"
          color="red"
          text="Unclear Image"
          margin="16px 0 0 0"
        /> */}
        <Button
          disabled={false}
          onClick={prepareSubmissionData}
          bgColor="#147b5c"
          color="#ffffff"
          text="SUBMIT"
          margin="16px 0 0 0"
        />
      </Flex>

      <Flex justifyContent="space-between" margin="20px 0">
        <Button
          onClick={markImageAsUnclear}
          bgColor="#e74c3c"
          color="#ffffff"
          text="Unclear Image"
          margin="16px 0 0 0"
        />
        <Button
          onClick={markImageAsInvalid}
          bgColor="#e74c3c"
          color="#ffffff"
          text="Invalid Form"
          margin="16px 0 0 0"
        />
      </Flex>
    </>
  );
};
