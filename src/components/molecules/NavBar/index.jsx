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
  const response = await apiService("/api/v1/transcribe", "GET");
  if (response.data.session_id) {
    localStorage.setItem("session_id", response.data.session_id);
    // console.log("response data", response.data);
  }
  return response.data;
};

export const NavBar = ({ justifyContent, stats }) => {
  const {
    data: initialData,
    isLoading,
    isError,
  } = useQuery(["transcribe2"], fetchInitialData, {
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
              value={initialData.data?.statistics?.total_results}
              total={initialData.data?.statistics?.total_images}
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
            <ProgressBar value={0} total={50} progressColor="#F58D53" />
          </ProgressBarContainer>
        )
      )}
    </Wrapper>
  );
};
