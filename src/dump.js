// useEffect(() => {
//     preSelectState(imageURLArray[5], data.states);
//   }, [data]);

//   async function preSelectState(key, states) {
//     const state = states.find((state) => {
//       return sanitizeString(state?.name) === sanitizeString(key);
//     });

//     if (state?.id && state?.name) {
//       setState({
//         id: state?.id,
//         label: `${state?.id} - ${state?.name}`,
//       });

//       const lgaData = await dispatch(getLocalGovernmentsAsync(state.id));
//       if (lgaData.payload) {
//         setLocalGovernments(lgaData.payload);
//         const LGAs = lgaData.payload.find((lga) => {
//           return sanitizeString(lga?.name) === sanitizeString(imageURLArray[6]);
//         });

//         if (LGAs?.id && LGAs?.name) {
//           setLGA({
//             id: LGAs.id,
//             label: `${LGAs.id} - ${LGAs.name}`,
//           });

//           const puData = await dispatch(pollingUnitsAsync(LGAs.id));
//           if (puData.payload) {
//             setPollingUnits(puData.payload);
//             const PUs = puData.payload.find((pollingUnit) => {
//               return (
//                 sanitizeString(pollingUnit?.delimitation) ===
//                 sanitizeString(imageURLArray[7].split(".")[0])
//               );
//             });

//             if (PUs?.id && PUs?.abbreviation && PUs?.name) {
//               setPollingUnit({
//                 id: PUs.id,
//                 label: `${PUs.abbreviation} - ${PUs.name}`,
//               });
//             }
//           }
//         }
//       }
//     }
//   }
