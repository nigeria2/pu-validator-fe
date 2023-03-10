import React from "react";
import styled from "styled-components";
import { ReactComponent as LogoSvg } from "../../../assets/svgs/v_logo.svg";
import { Flex } from "../../atoms";
import { SilentLink } from "../../atoms/SilentLink";
import { screen } from "../../theme/utils";
import { Loader } from "../../atoms/Loader";
import { ProgressBar } from "../../atoms/ProgressBar";

const Wrapper = styled(Flex)`
  background-color: #ffffff;
  height: 60px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;

  @media only screen and (${screen.sm}) {
    justify-content: ${({ justifyContent }) => justifyContent || "flex-start"};
  }
`;
const ProgressBarContainer = styled.div`
  width: 25%;
  position: absolute;
  right: 10px;
  top: 11px;

  @media only screen and (${screen.sm}) {
    width: 40%;
  }
`;

export const NavBar = ({ justifyContent, stats }) => {
  return (
    <Wrapper justifyContent={justifyContent} className="container">
      {stats.isLoading ? (
        <Loader type="circle" />
      ) : stats.isError ? (
        <p>Error</p>
      ) : (
        stats.data && (
          <ProgressBarContainer>
            <ProgressBar
              value={stats?.data?.data?.statistics?.total_results}
              total={stats?.data?.data?.statistics?.total_images}
            />
          </ProgressBarContainer>
        )
      )}
      <div>
        <LogoSvg width="32px" height="32px" />
      </div>
      <SilentLink to="/">
        <h3 style={{ margin: "0", padding: "0" }}>Validation</h3>
      </SilentLink>
    </Wrapper>
  );
};
