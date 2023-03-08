import React from "react";
import { getAllowedParties } from "../../../utils/getAllowedParties";
import { Logo } from "../VoteInput";
import { Flex } from "../../atoms";
import styled from "styled-components";

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

export const VotesDisplay = ({ data }) => {
  const ALLOWED_PARTIES = getAllowedParties(data.parties);

  return (
    <div>
      {ALLOWED_PARTIES.map((data, idx) => (
        <Flex key={idx} alignItems="center" margin="0 0 16px 0">
          <Label color="#147b5c" fontWeight="600">
            <Logo src={data.icon} alt={`${data.name}-logo`} /> {data.name}
          </Label>
          <Label margin="0 0 0 16px">Votes</Label>
        </Flex>
      ))}
    </div>
  );
};
