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
    document.getElementById("signInDiv").hidden = false;
  }

  async function handleResponse(response) {
    let userObject = jwtDecode(response.credential);
    await dispatch(setUser(userObject));
    document.getElementById("signInDiv").hidden = true;
    console.log("user object", user);
    navigate("/validators");
  }

  useEffect(() => {
    window.google.accounts.id.initialize({
      client_id:
        "92393687539-22riomfdrm15bi7p3vellhe3rqr0nja4.apps.googleusercontent.com",

      callback: handleResponse,
    });

    window.google.accounts.id.renderButton(
      document.getElementById("signInDiv"),
      {
        theme: "outline",
        size: "large",
      }
    );

    window.google.accounts.id.prompt();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Wrapper>
      <div id="signInDiv"></div>
      {Object.keys(user).length !== 0 ? (
        <SignOutBtn onClick={handleSignout}>Signout</SignOutBtn>
      ) : null}
    </Wrapper>
  );
};
