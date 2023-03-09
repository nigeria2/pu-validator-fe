export const serializeStatesData = (states) => {
  return states.map((state) => {
    return { id: state.id, label: `${state.id} - ${state.name}` };
  });
};

export const serializeLGAData = (lgas) => {
  return lgas.map((lga) => {
    return { id: lga.id, label: `${lga.id} - ${lga.name}` };
  });
};

export const serializePollingUnitData = (pollingUnits) => {
  return pollingUnits.map((pu) => {
    // console.log("polling unit data", pu);
    return {
      id: pu.id,
      label: `${pu.abbreviation} - ${pu.name}`,
    };
  });
};

export const serializePartiesDataForSubmission = (data) => {
  const newValues = [...data].map((party) => {
    const newParty = { ...party };
    delete newParty.name;
    delete newParty.icon;
    newParty.score = +newParty.score;

    return newParty;
  });

  return newValues;
};
