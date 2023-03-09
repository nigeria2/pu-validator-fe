import React from "react";
import { HomeTemplate as CustomHomeTemplate } from "../../templates/HomeTemplate";
import { Footer } from "../../molecules/Footer";
// import { ShowResults } from "../../molecules/ShowResults";
import styled from "styled-components";
import { CheckBox, Flex as CustomFlex } from "../../atoms";
import { screen } from "../../theme/utils";
import apiService from "../../../api-utils/api-service";
import { useQuery } from "@tanstack/react-query";
import { Loader } from "../../atoms/Loader";
import ReactPanZoom from "react-image-pan-zoom-rotate";
import { NavBar } from "../../molecules";
import { VotesDisplay } from "../../molecules/VotesDisplay";
// import { Button } from "../../atoms/Button";
// import Profilepics from "../../../assets/svgs/profilepix.svg";
import { useSelector } from "react-redux";
import { selectUserData } from "../../../store/features/auth/authSlice";
import { ProgressBar } from "../../atoms/ProgressBar";

const HomeTemplate = styled(CustomHomeTemplate)`
  @media only screen and (${screen.sm}) {
    position: relative;
  }
`;
const Flex = styled(CustomFlex)`
  @media only screen and (${screen.sm}) {
    flex-direction: ${({ directionSm }) => directionSm};
    padding: 10px;
    width: 100%;
  }
`;

const HeaderLogo = styled.div`
  @media only screen and (${screen.sm}) {
    position: absolute;
    margin: 10px;
    top: 0;
  }
`;

const ContentWrapper = styled.div`
  gap: 1em;
  margin: auto;
  width: 95%;
  margin-bottom: 50px;
  position: relative;
  @media only screen and (${screen.sm}) {
    display: block;
    padding: 10px;
    width: 100%;
  }
`;

const UserProfileParent = styled.div`
  position: absolute;
  top: 0;
  margin-bottom: 10px;
  @media only screen and (${screen.sm}) {
    position: relative;
    display: grid;
    width: 100%;
    align-items: center;
    justify-content: flex-end;
  }
`;

const UserProfile = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  @media only screen and (${screen.sm}) {
    align-items: center;
  }
`;

const UserName = styled.h6`
  font-size: 16px;
  margin-top: 6px;
  @media only screen and (${screen.sm}) {
    font-size: 14px;
    margin-bottom: 2px;
    display: none;
  }
`;

const ProfilePics = styled.img`
  height: 45px;
  width: 45px;
  border-radius: 100%;

  @media only screen and (${screen.sm}) {
    height: 60px;
    width: 60px;
  }
`;

const ValidText = styled.div`
  display: block;
  @media only screen and (${screen.sm}) {
    display: none;
  }
`;

const ValidH3 = styled.h2`
  font-size: 22px;
  color: #147b5c;

  @media only screen and (${screen.sm}) {
    display: none;
  }
`;

const PollingUnit = styled.div`
  background: #fafaf5;
  padding: 16px 8px;
  margin: 10px 0;
  display: none;
  @media only screen and (${screen.sm}) {
    display: block;
  }
`;

const PollingUnitAddress = styled.div`
  width: 25%;

  @media only screen and (${screen.sm}) {
    width: 50%;
  }
`;

const ProgressBarParent = styled.div`
  width: 25%;
  // position: absolute;
  // right: 10px;
  // top: 11px;

  @media only screen and (${screen.sm}) {
    width: 36%;
  }
`;

const LeftContent = styled(Flex)`
  width: 70%;
  padding: 0 1.5em 0 0;
  // border-right: 1px solid #e5e2ed;
  justify-content: center;
  align-items: center;

  @media only screen and (${screen.sm}) {
    padding: 10px 0;
    width: 100%;
    height: 40vh;
    background-color: black;
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

const Checks = styled.div``;

export const fetchInitialData = async () => {
  const response = await apiService("/api/v1/transcribe", "GET");
  if (response.data.session_id) {
    localStorage.setItem("session_id", response.data.session_id);
    // console.log("response data", response.data);
  }
  return response.data;
};

export const FormValidationPage = () => {
  const {
    data: initialData,
    isLoading,
    isError,
  } = useQuery(["form_validation_data"], fetchInitialData, {
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });
  const user = useSelector(selectUserData);

  return (
    <HomeTemplate footer={<Footer />}>
      <HeaderLogo>
        <NavBar justifyContent={"flex-start"} />
      </HeaderLogo>

      <ContentWrapper className="container">
        <ValidText>
          <Flex justifyContent="center" padding="7px 0">
            <ValidH3>Validator</ValidH3>
          </Flex>
        </ValidText>

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
              <UserProfileParent>
                <UserProfile>
                  <ProfilePics src={user?.picture} alt={user.name} />
                  <UserName>{user?.name}</UserName>
                </UserProfile>
              </UserProfileParent>

              <PollingUnit>
                <Flex justifyContent={"space-between"} alignItems={"center"}>
                  <PollingUnitAddress>
                    <h3
                      style={{
                        fontSize: "12px",
                        margin: "3px 0",
                        fontWeight: "500",
                      }}
                    >
                      Lagos State
                    </h3>
                    <h4
                      style={{
                        margin: "3px 0",
                        fontSize: "12px",
                        fontWeight: "700",
                      }}
                    >
                      001- Anifowoshe . PRY. SCH
                    </h4>
                  </PollingUnitAddress>
                  <ProgressBarParent>
                    <ProgressBar value={"8990"} total={"10000"} />
                  </ProgressBarParent>
                </Flex>
              </PollingUnit>
            </>
          )
        )}

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

                  <Flex
                    justifyContent="center"
                    direction="column"
                    directionSm="column-reverse"
                  >
                    <Flex justifyContent="center" direction="column">
                      <Checks>
                        <p
                          style={{
                            fontSize: "20px",
                            fontWeight: 500,
                          }}
                        >
                          Please check all votes and that the polling unit is
                          correct
                        </p>
                        <CheckBox
                          name="isUnclear"
                          label="Is this image unclear"
                          // value={isNotStamped}
                          // onChange={handleisNotStamped}
                        />
                        <CheckBox
                          name="isNotPresidentialForm"
                          label="This is not a presidential form"
                          // value={isNotPresidentialForm}
                          // onChange={handleisNotPresidentialForm}
                        />
                      </Checks>
                    </Flex>

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
                      <ValidateButton>Yes</ValidateButton>
                      <ValidateButton>No</ValidateButton>
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
