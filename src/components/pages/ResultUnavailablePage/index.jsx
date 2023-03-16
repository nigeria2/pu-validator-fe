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
<a href="https://drive.google.com/drive/folders/173oHgms6wYy5WKz_i3Lhl5mXcmobCWHz">View result here</a>
      </Wrapper>
    </StatisticsTemplate>
  );
};
