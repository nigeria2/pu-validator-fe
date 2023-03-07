import React from "react";
import { HomeTemplate } from "../../templates/HomeTemplate";
import { Footer } from "../../molecules/Footer";
// import { ShowResults } from "../../molecules/ShowResults";
import styled from "styled-components";
import { Flex } from "../../atoms";
import { screen } from "../../theme/utils";
import apiService from "../../../api-utils/api-service";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../../atoms/Loader";
import ReactPanZoom from "react-image-pan-zoom-rotate";
import { NavBar } from "../../molecules";
import { VotesDisplay } from "../../molecules/VotesDisplay";
import { Button } from "../../atoms/Button";

const ContentWrapper = styled(Flex)`
  padding: 30px 0;
  gap: 1em;
  @media only screen and (${screen.sm}) {
    display: block;
    padding: 10px;
  }
`;
const RightContent = styled(Flex)`
  width: 70%;
  padding: 0 1.5em 0 0;
  border-right: 1px solid #e5e2ed;
  justify-content: center;
  align-items: center;

  @media only screen and (${screen.sm}) {
    padding: 30px 0;
    width: 100%;
  }
`;
const LeftContent = styled(Flex)`
  width: 30%;
  max-height: 60vh;

  @media only screen and (${screen.sm}) {
    padding: 30px 0;
    width: 100%;
  }
`;
const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
`;
const ErrorAndLoaderWrapper = styled(Flex)`
  justify-content: center;
  align-items: center;
  width: 40vh;
  height: 40vh;
`;
const ErrrorText = styled.p`
  color: red;
  text-align: center;
  @media only screen and (${screen.sm}) {
    width: 70%;
  }
`;
export const fetchInitialData = async () => {
  const response = await apiService("/api/v1/transcribe", "GET");
  if (response.data.session_id) {
    localStorage.setItem("session_id", response.data.session_id);
    console.log("response data", response.data);
  }
  return response.data;
};

export const FormValidationPage = () => {
  const {
    data: initialData,
    isLoading,
    isError,
  } = useQuery(["transcribe"], fetchInitialData, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <HomeTemplate header={<NavBar />} footer={<Footer />}>
      <ContentWrapper className="container">
        {isLoading ? (
          <ErrorAndLoaderWrapper>
            <Loader type="circle" width="50px" height="50px" />
          </ErrorAndLoaderWrapper>
        ) : isError ? (
          <ErrorAndLoaderWrapper>
            <ErrrorText>An error occured while fetching image</ErrrorText>
          </ErrorAndLoaderWrapper>
        ) : (
          initialData && (
            <>
              <RightContent width="70%">
                <ImageWrapper>
                  <ReactPanZoom image={initialData.data.image.url} />
                </ImageWrapper>
              </RightContent>
              <LeftContent width="30%" direction="column">
                <VotesDisplay data={initialData.data} />

                <section>
                  <p>Do you think this list is accurate</p>
                  <Flex justifyContent="center">
                    <Button>Yes</Button>
                    <Button>No</Button>
                  </Flex>
                </section>
              </LeftContent>
            </>
          )
        )}
      </ContentWrapper>
      {/* <ShowResults stats={{ data: initialData, isLoading, isError }} /> */}
    </HomeTemplate>
  );
};
