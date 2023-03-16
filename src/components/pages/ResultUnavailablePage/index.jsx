import React from "react";
import { StatisticsTemplate } from "../../templates";
import { Footer, NavBar } from "../../molecules";
import styled from "styled-components";
import { Flex } from "../../atoms";

const Wrapper = styled(Flex)`
  min-height: 78vh;
  justify-content: center;
  align-items: center;
  padding-top: 30px;
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
