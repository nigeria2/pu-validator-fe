import React, { useEffect } from "react";
import styled from "styled-components";
import { Flex } from "../../atoms";
import jwtDecode from "jwt-decode";
import { useDispatch, useSelector } from "react-redux";
import {
  selectUserData,
  setUser,
} from "../../../store/features/auth/authSlice";
import { useNavigate } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";

const Wrapper = styled(Flex)`
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const SignOutBtn = styled.button`
  padding: 16px 32px;
  cursor: pointer;
  border: 0;
  border-radius: 64px;
`;

export const LoginPage = () => {
  const user = useSelector(selectUserData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  function handleSignout() {
    dispatch(setUser({}));
  }

  async function handleResponse(response) {
    let userObject = jwtDecode(response.credential);
    await dispatch(setUser(userObject));
    navigate("/validators");
  }

  useEffect(() => {
    handleSignout();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <GoogleLogin
        onSuccess={handleResponse}
        onError={() => {
          console.log("Login Failed");
        }}
      />
      ;
      {Object.keys(user).length !== 0 ? (
        <SignOutBtn onClick={handleSignout}>Signout</SignOutBtn>
      ) : null}
    </Wrapper>
  );
};
