import React from "react";
import { HomeTemplate } from "../../templates/HomeTemplate";
import { Footer } from "../../molecules/Footer";
import { ShowResults } from "../../molecules/ShowResults";
import { Header } from "../../organisms";
import styled from "styled-components";
import { Flex } from "../../atoms";
import { screen } from "../../theme/utils";
import apiService from "../../../api-utils/api-service";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../../atoms/Loader";
import ReactPanZoom from "react-image-pan-zoom-rotate";
import { NavBar } from "../../molecules";
import { FormSectionV2 } from "../../organisms/FormSectionV2";

const ContentWrapper = styled(Flex)`
  gap: 1em;
  @media only screen and (${screen.sm}) {
    display: block;
    padding: 10px;
  }
`;
const LeftContent = styled(Flex)`
  width: 70%;
  /* border-right: 1px solid #e5e2ed; */
  justify-content: center;
  align-items: center;

  @media only screen and (${screen.sm}) {
    padding: 30px 0;
    width: 100%;
  }
`;
const RightContent = styled(Flex)`
  width: 30%;
  min-height: 60px;
  /* max-height: 70vh;
  overflow: auto;
  padding-right: 6px;
  padding-bottom: 60px;
 */

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
  border: 10px solid #f58d53;
  border-radius: 20px;
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
  const response = await apiService("/api/v2/transcribe", "GET");
  if (response.data.session_id) {
    localStorage.setItem("session_id", response.data.session_id);
    // console.log("response data", response.data);
  }
  return response.data;
};

export const TranscriptionV2Page = () => {
  const {
    data: initialData,
    isLoading,
    isError,
    refetch,
  } = useQuery(["transcribev2"], fetchInitialData, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  return (
    <HomeTemplate
      header={
        <>
          <NavBar />
          <Header />
        </>
      }
      footer={<Footer />}
    >
      <ContentWrapper className="container">
        <LeftContent width="70%">
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
              <ImageWrapper>
                <ReactPanZoom image={initialData.data.image.url} />
              </ImageWrapper>
              // <div></div>
            )
          )}
        </LeftContent>
        <RightContent width="30%" direction="column">
          {isLoading ? (
            <ErrorAndLoaderWrapper>
              <Loader type="circle" width="50px" height="50px" />
            </ErrorAndLoaderWrapper>
          ) : isError ? (
            <ErrorAndLoaderWrapper>
              <ErrrorText>
                An error occured while fetching party data
              </ErrrorText>
            </ErrorAndLoaderWrapper>
          ) : (
            initialData && (
              <FormSectionV2 data={initialData.data} refetch={refetch} />
            )
          )}
        </RightContent>
      </ContentWrapper>
      <ShowResults stats={{ data: initialData, isLoading, isError }} />
    </HomeTemplate>
  );
};
