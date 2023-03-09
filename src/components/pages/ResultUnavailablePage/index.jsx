import React from "react";
import { StatisticsTemplate } from "../../templates";
import { Footer, NavBar } from "../../molecules";
import styled from "styled-components";
import { Flex } from "../../atoms";
import { screen } from "../../theme/utils";

const Wrapper = styled(Flex)`
  min-height: 78vh;
  justify-content: center;
  /* align-items: center; */
  padding-top: 30px;
`;
const TextContainer = styled.div`
  border-top: 5px solid #147b5c;
  width: 50%;
  padding: 10px;
  text-align: center;

  @media only screen and (${screen.sm}) {
    width: 95%;
  }
`;

export const ResultUnavailablePage = () => {
  return (
    <StatisticsTemplate header={<NavBar />} footer={<Footer />}>
      <Wrapper>
        <TextContainer>
          <p>
            Based on advice from the legal team, we are going to show the
            results when the process is complete. Please continue working hard
            to reclaim the mandate.
          </p>
          <p>Every validation counts.</p>
        </TextContainer>
      </Wrapper>
    </StatisticsTemplate>
  );
};
