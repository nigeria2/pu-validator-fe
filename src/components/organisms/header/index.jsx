import React from "react";
import styled from "styled-components";
import { NavBar } from "../../molecules";
import { ProgressBar } from "../../atoms/ProgressBar";
import { Loader } from "../../atoms/Loader";
import { screen } from "../../theme/utils";
import { Flex } from "../../atoms";
import { Icons } from "../../atoms/Icons";

const ProgressBarContainer = styled.div`
  width: 25%;
  position: absolute;
  right: 10px;
  top: 11px;

  @media only screen and (${screen.sm}) {
    width: 40%;
  }
`;
export const Header = ({ stats }) => {
  return (
    <StyledHeaderWrapper className="container">
      <NavBar />
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

      <StyledInstructionBox>
        <h2>INSTRUCTIONS</h2>

        <p> ENTER THE NUMBERS YOU SEE IN THE IMAGE INTO THE TEXTBOXES</p>
      </StyledInstructionBox>
      <Flex alignItems="center" margin="0 0 16px 0">
        <Icons width="35" type="warning" fill="#ffc107" />{" "}
        <p
          style={{
            paddingLeft: "10px",
            color: "#ffc107",
            fontWeight: "500",
          }}
        >
          Only blurry images left. New images will be arriving on Sunday by 6pm{" "}
        </p>
      </Flex>
    </StyledHeaderWrapper>
  );
};

export const StyledHeaderWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
`;

export const StyledInstructionBox = styled.div`
  background: #fafaf5;
  border-radius: 10px;
  text-align: center;

  padding: 28px;
  width: 100%;

  h2 {
    /* font-family: 'Satoshi';
        font-style: normal; */
    margin: 0;
    padding: 0;
    font-weight: 500;
    font-size: 18px;
    line-height: 24px;

    text-align: center;
    text-decoration-line: underline;

    color: #111111;
  }

  p {
    max-width: 500px;
    margin-inline: auto;
    font-weight: 700;
    font-size: 20px;
    line-height: 32px;

    text-align: center;

    color: #b61c1c;
  }
`;
