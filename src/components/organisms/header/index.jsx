import React from "react";
import styled from "styled-components";
// import { Flex } from "../../atoms";
// import { Icons } from "../../atoms/Icons";

export const Header = ({ stats }) => {
  return (
    <StyledHeaderWrapper className="container">
      <StyledInstructionBox>
        <h2>INSTRUCTIONS</h2>

        <p>
          {" "}
          VALIDATION OF RESULTS IS NOW COMPLETE. THE RESULTS WILL SOON BE
          PUBLISHED
        </p>
      </StyledInstructionBox>
      {/* <Flex alignItems="center" margin="0 0 16px 0">
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
      </Flex> */}
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
  margin: 12px 0 24px 0;

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
