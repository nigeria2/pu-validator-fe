import React from "react";
import { HomeTemplate } from "../../templates/HomeTemplate";
import { Footer } from "../../molecules/Footer";
// import { ShowResults } from "../../molecules/ShowResults";
import styled from "styled-components";
// import { Flex } from "../../atoms";
import { screen } from "../../theme/utils";
import apiService from "../../../api-utils/api-service";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../../atoms/Loader";
import ReactPanZoom from "react-image-pan-zoom-rotate";
import { NavBar } from "../../molecules";
import { VotesDisplay } from "../../molecules/VotesDisplay";
// import { Button } from "../../atoms/Button";
import { ProgressBar } from "../../atoms/ProgressBar";
import Profilepics from "../../../assets/svgs/profilepix.svg";

const Flex = styled.div`
  display: flex;
  flex-direction: ${({ direction }) => direction};
  flex-wrap: ${({ wrap }) => wrap};
  justify-content: ${({ justifyContent }) => justifyContent};
  align-items: ${({ alignItems }) => alignItems};
  align-content: ${({ alignContent }) => alignContent};
  order: ${({ order }) => order};
  flex-grow: ${({ grow }) => grow};
  flex-shrink: ${({ shrink }) => shrink};
  flex-basis: ${({ basis }) => basis};
  align-self: ${({ alignSelf }) => alignSelf};
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  margin: ${({ margin }) => margin};
  padding: ${({ padding }) => padding};
  position: ${({ position }) => position};
  border: ${({ border }) => border};
  border-right: ${({ borderRight }) => borderRight};
  border-left: ${({ borderLeft }) => borderLeft};
  border-top: ${({ borderTop }) => borderTop};
  border-bottom: ${({ borderBottom }) => borderBottom};
  gap: ${({ gap }) => gap};
  color: ${({ color }) => color};
  @media only screen and (${screen.sm}) {
    flex-direction: ${({ directionSm }) => directionSm};
    padding: 10px;
    width: 100%;
  }
`;
const ContentWrapper = styled.div`
  gap: 1em;
  margin: auto;
  width: 95%;
  margin-bottom: 50px;
  min-height: 632px;
  @media only screen and (${screen.sm}) {
    display: block;
    padding: 10px;
    width: 100%;
  }
`;

const UserProfile = styled.div`
  // height: 120px;
  position: absolute;
  left: 35px;
  top: 60px;
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (${screen.sm}) {
    position: relative;
    left: 0px;
    top: 0px;
    margin-buttom: 0px;
  }
`;

const UserName = styled.h6`
  font-size: 19px;
  margin: 0px;
  @media only screen and (${screen.sm}) {
    font-size: 14px;
  }
`;

const ProfilePics = styled.img`
  height: 40px;
  width: 40px;
`;

const UserLocation = styled.p`
  font-size: 13px;
  color: #6d9a8d;
  font-weight: 500;
  margin: 5px 0 0 0;
  display: none;
  @media only screen and (${screen.sm}) {
    display: block;
    font-size: 10px;
  }
`;

const ValidText = styled.h2`
  font-size: 22px;
  color: #147b5c;
`;
const LeftContent = styled(Flex)`
  width: 70%;
  padding: 0 1.5em 0 0;
  // border-right: 1px solid #e5e2ed;
  justify-content: center;
  align-items: center;
  max-height: 100vh;

  @media only screen and (${screen.sm}) {
    padding: 10px 0;
    width: 100%;
  }
`;
const RightContent = styled(Flex)`
  width: 30%;

  @media only screen and (${screen.sm}) {
    padding: 10px 0;
    width: 100%;
    flex-direction: column-reverse;
  }
`;
const ImageWrapper = styled.div`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  border-radius: 10px;
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

const ValidateButton = styled.button`
  border: 2px solid #147b5c;
  padding: 10px;
  border-radius: 0;
  cursor: pointer;
  padding: 12px 28px;
  font-weight: bold;
  color: #147b5c;
  margin: 0 8px;
  background: none;

  &:hover {
    background: #147b5c;
    color: #fff;
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
    <HomeTemplate
      header={<NavBar stats={{ data: initialData, isLoading, isError }} />}
      footer={<Footer />}
    >
      <ContentWrapper className="container">
        {/* <Flex justifyContent="center" padding="10px 0">
          <ProgressBar width="40%" value={50} total={2000} />
        </Flex> */}

        <Flex justifyContent="center" padding="7px 0">
          <ValidText>Validator</ValidText>
        </Flex>
        <UserProfile>
          <ProfilePics src={Profilepics} alt="Profile" />
          <UserName>David Agu</UserName>
          <UserLocation>Lagos State</UserLocation>
        </UserProfile>
        <Flex directionSm="column">
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
                <LeftContent width="70%">
                  <ImageWrapper>
                    <ReactPanZoom image={initialData.data.image.url} />
                  </ImageWrapper>
                </LeftContent>
                <RightContent width="30%" direction="column">
                  <VotesDisplay data={initialData.data} />

                  <Flex justifyContent="center" direction="column">
                    <p
                      style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: 500,
                      }}
                    >
                      Are the results here accurate?
                    </p>
                    <Flex justifyContent="center">
                      {/* <Button
                        bgColor="#147b5c"
                        color="#ffffff"
                        text="Yes"
                        margin="0 16px 0 0"
                      /> */}
                      <ValidateButton>Yes</ValidateButton>
                      <ValidateButton>No</ValidateButton>
                      {/* <Button bgColor="#147b5c" color="#ffffff" text="No" /> */}
                    </Flex>
                  </Flex>
                </RightContent>
              </>
            )
          )}
        </Flex>
      </ContentWrapper>
      {/* <ShowResults stats={{ data: initialData, isLoading, isError }} /> */}
    </HomeTemplate>
  );
};
