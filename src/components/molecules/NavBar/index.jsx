import React from "react";
import styled from "styled-components";
import { ReactComponent as LogoSvg } from "../../../assets/svgs/v_logo.svg";
import { Flex } from "../../atoms";
import { SilentLink } from "../../atoms/SilentLink";
import { screen } from "../../theme/utils";
import { Loader } from "../../atoms/Loader";
import { ProgressBar } from "../../atoms/ProgressBar";
import apiService from "../../../api-utils/api-service";
import { useQuery } from "@tanstack/react-query";

const Wrapper = styled(Flex)`
  background-color: #ffffff;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ProgressBarContainer = styled.div`
  width: 25%;
  @media only screen and (${screen.sm}) {
    width: 30%;
  }
`;

export const fetchInitialData = async () => {
  const response = await apiService("/api/v2/statistics", "GET");
  return response.data;
};

export const NavBar = ({ justifyContent }) => {
  const {
    data: initialData,
    isLoading,
    isError,
  } = useQuery(["statsV2"], fetchInitialData, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <Wrapper justifyContent={justifyContent} className="container">
      {isLoading ? (
        <Loader type="circle" />
      ) : isError ? (
        <p>Error</p>
      ) : (
        initialData && (
          <ProgressBarContainer>
            <ProgressBar
              value={initialData.data?.statistics?.v1?.total_results}
              total={initialData.data?.statistics?.v1?.total_images}
            />
          </ProgressBarContainer>
        )
      )}
      <Flex alignItems="center">
        <div>
          <LogoSvg width="32px" height="32px" />
        </div>
        <SilentLink to="/">
          <h3 style={{ margin: "0", padding: "0" }}>Validation</h3>
        </SilentLink>
      </Flex>
      {isLoading ? (
        <Loader type="circle" />
      ) : isError ? (
        <p>Error</p>
      ) : (
        initialData && (
          <ProgressBarContainer>
            <ProgressBar
              value={initialData.data?.statistics?.v2?.total_results}
              total={initialData.data?.statistics?.v2?.total_images}
              progressColor="#F58D53"
progressStatusTxt="validated"
            />
          </ProgressBarContainer>
        )
      )}
    </Wrapper>
  );
};
