import React from "react";
import ReactDOM from "react-dom";
import styled, { keyframes } from "styled-components";
import { screen } from "../../theme/utils";
import Congrats from "../../../assets/svgs/congrats.svg";

const fadeIn = keyframes`
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
`;

const ModalWrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 10000000 !important;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

const ModalContent = styled.div`
  width: 60%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 5px;
  padding: 36px;
  z-index: 10000000 !important;
  animation: ${fadeIn} 0.3s ease-in-out;
  @media only screen and (${screen.sm}) {
    width: 90%;
  }
`;

const Icon = styled.img`
  height: 92px;
  width: 110px;
  @media only screen and (${screen.sm}) {
    height: 88px;
    width: 96px;
  }
`;

const Title = styled.h3`
  font-size: 24px;
  font-weight: 600;
  margin-bottom: 8px;
  @media only screen and (${screen.sm}) {
    font-size: 20px;
    margin-bottom: 4px;
  }
`;

const SubTitle = styled.p`
  width: 60%;
  margin-top: 8px;
  font-size: 16px;
  color: #6a6a6a;
  text-align: center;
  @media only screen and (${screen.sm}) {
    font-size: 14px;
    margin-top: 4px;
    width: 90%;
  }
`;

const subtitleText = [
  "You validated this sheet. Your work is making Nigeria a better place",
  "Let's make this happen! You validated well.",
  "You did a good job, well done!",
  "I like the numbers you entered.",
  "You're working hard to make the country a better place.",
  "Your passion is the engine that will help us build a better Nigeria",
];

function generateRandomIndex(max) {
  return Math.floor(Math.random() * max);
}

const Modal = ({ isActive }) => {
  return ReactDOM.createPortal(
    isActive === true ? (
      <ModalWrapper>
        <ModalContent>
          <Icon src={Congrats} />
          <Title>Submission Successful!</Title>
          <SubTitle>
            {subtitleText[generateRandomIndex(subtitleText.length)]}
          </SubTitle>
        </ModalContent>
      </ModalWrapper>
    ) : null,
    document.getElementById("portal")
  );
};

export default Modal;
