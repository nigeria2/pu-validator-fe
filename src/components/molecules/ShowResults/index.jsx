import React from "react";
import { Flex } from "../../atoms";
import { SilentLink } from "../../atoms/SilentLink";
// import styled from "styled-components";
// import { screen } from "../../theme/utils";
// import { Loader } from "../../atoms/Loader";
// import { formatNumber } from "../../../utils/formatNumber";

// const SummaryText = styled.p`
//   @media only screen and (${screen.sm}) {
//     width: 70%;
//     text-align: center;
//   }
// `;
export const ShowResults = ({ stats }) => {
  // const totalResults = stats?.data?.data?.statistics?.total_results;
  return (
    <Flex direction="column" justifyContent="center" alignItems="center">
      <SilentLink to={`/results`}>
        <h3 style={{ color: "#147B5C", margin: "6px 0" }}>
          Show Results &rarr;
        </h3>
        {/* &#10132; */}
      </SilentLink>

      {/* {stats.isLoading ? (
        <Loader type="circle" />
      ) : stats.isError ? (
        <p>Error</p>
      ) : (
        stats.data && (
          <SummaryText width="80%">
            {formatNumber(totalResults)} image(s) transcribed so far.{" "}
            {formatNumber(
              stats?.data?.data?.statistics?.total_images - totalResults
            )}{" "}
            images not transcribed yet
          </SummaryText>
        )
      )} */}
    </Flex>
  );
};
