import React from "react";
import styled from "styled-components";
import { Flex } from "../../atoms";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserData,
  setUser,
} from "../../../store/features/auth/authSlice";
import { GoogleLogin, googleLogout } from "@react-oauth/google";
import { StatisticsTemplate } from "../../templates";
import { Footer, NavBar } from "../../molecules";
import { screen } from "../../theme/utils";
import { useNavigate } from "react-router";

const Wrapper = styled(Flex)`
  justify-content: center;
  padding-top: 20px;
  min-height: 81vh;
`;

const SignOutBtn = styled.button`
  padding: 12px 32px;
  cursor: pointer;
  height: fit-content;
  width: fit-content;
  border-radius: 64px;
  background-color: white;
  border: 1px solid #eeeeee;

  @media only screen and (${screen.sm}) {
    width: 100%;
  }
`;

export const LoginPage = () => {
  const user = useSelector(selectUserData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSignout() {
    dispatch(setUser({}));
    googleLogout();
  }

  async function handleResponse(response) {
    let userObject = jwtDecode(response.credential);
    await dispatch(setUser(userObject));
    navigate("/validators");
  }

  return (
    <StatisticsTemplate
      header={<NavBar justifyContent="center" />}
      footer={<Footer />}
    >
      <Wrapper>
        {Object.keys(user).length !== 0 ? (
          <SignOutBtn onClick={handleSignout}>Sign out</SignOutBtn>
        ) : (
          <GoogleLogin
            onSuccess={handleResponse}
            onError={(errorResponse) => {
              console.log(errorResponse.error);
            }}
            useOneTap
          />
        )}
      </Wrapper>
    </StatisticsTemplate>
  );
};
