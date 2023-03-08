import React from "react";
import { getAllowedParties } from "../../../utils/getAllowedParties";
import { Logo } from "../VoteInput";
import { Flex } from "../../atoms";
import styled from "styled-components";
import { screen } from "../../theme/utils";

const Wrapper = styled.div`
  @media only screen and (${screen.sm}) {
    margin-top: 16px;
  }
`;

const Label = styled(Flex)`
  background-color: #e2e7e6;
  color: ${({ color }) => color};
  justify-content: center;
  align-items: center;
  min-width: 50%;
  min-height: 50px;
  font-weight: ${({ fontWeight }) => fontWeight};
  width: 50%;
`;

const LogoIcon = styled(Flex)`
  background-color: #e2e7e6;
  color: ${({ color }) => color};
  justify-content: flex-start;
  align-items: center;
  padding-left: 28px;
  min-width: 50%;
  min-height: 50px;
  font-weight: ${({ fontWeight }) => fontWeight};
  width: 50%;
`;

export const VotesDisplay = ({ data }) => {
  const ALLOWED_PARTIES = getAllowedParties(data.parties);

  return (
    <Wrapper>
      {ALLOWED_PARTIES.map((data, idx) => (
        <Flex key={idx} width="95%" alignItems="center" margin="0 0 16px 0">
          <LogoIcon color="#147b5c" fontWeight="600">
            <Logo src={data.icon} alt={`${data.name}-logo`} /> {data.name}
          </LogoIcon>
          <Label margin="0 0 0 16px">Votes</Label>
        </Flex>
      ))}
    </Wrapper>
  );
};
