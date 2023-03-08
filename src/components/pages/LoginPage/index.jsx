import React, { useEffect } from "react";
import styled from "styled-components";
import { Flex } from "../../atoms";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserData,
  setUser,
} from "../../../store/features/auth/authSlice";
import { GoogleLogin, googleLogout } from "@react-oauth/google";

const Wrapper = styled(Flex)`
  justify-content: center;
  padding-top: 20px;
  height: 100vh;
`;

const SignOutBtn = styled.button`
  padding: 12px 32px;
  cursor: pointer;
  height: fit-content;
  border-radius: 64px;
  background-color: white;
`;

export const LoginPage = () => {
  const user = useSelector(selectUserData);
  const dispatch = useDispatch();

  function handleSignout() {
    dispatch(setUser({}));
    googleLogout();
  }

  async function handleResponse(response) {
    let userObject = jwtDecode(response.credential);
    await dispatch(setUser(userObject));
    // navigate("/validators");
  }

  useEffect(() => {
    handleSignout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      {Object.keys(user).length !== 0 ? (
        <SignOutBtn onClick={handleSignout}>Signout</SignOutBtn>
      ) : (
        <GoogleLogin
          onSuccess={handleResponse}
          onError={() => {
            console.log("Login Failed");
          }}
          useOneTap
        />
      )}
    </Wrapper>
  );
};
