import React from "react";
import styled from "styled-components";
import { formatNumber } from "../../../utils/formatNumber";
import { screen } from "../../theme/utils";

const ProgressWrapper = styled.div`
  background-color: #dbe3e1;
  margin: 16px 0;
  border-radius: 50px;
  width: ${({ width }) => width || "100%"};
  position: relative;

  @media only screen and (${screen.sm}) {
    width: 100%;
  }
`;
const ProgressElement = styled.div`
  width: ${({ width }) => width};
  height: 15px;
  background-color: ${({ progressColor }) => progressColor || "#147b5c"};
  border-radius: 50px;
  position: relative;

  @media only screen and (${screen.sm}) {
    height: 12px;
  }
`;
const StatusValueText = styled.p`
  position: absolute;
  right: ${({ right }) => right || "5px"};
  left: ${({ left }) => left};
  top: ${({ top }) => top || "-8.5px"};
  font-weight: bold;
  font-style: italic;
  font-size: 0.65rem;
  color: ${({ color }) => color || "#147B5C"};
  white-space: nowrap;

  @media only screen and (${screen.sm}) {
    font-size: 0.55rem;
    top: ${({ top }) => top || "-8px"};
  }
`;

export const ProgressBar = ({ value, total, width, progressColor, progressStatusTxt }) => {
  const percentageOfCompletion = (value / total) * 100;
  const displayFigure =
    percentageOfCompletion % 2 === 0
      ? percentageOfCompletion
      : percentageOfCompletion.toFixed(1);
  const leftStatusTextProps = {
    top: "-24px",
    [displayFigure < 20 ? "left" : "right"]: displayFigure < 20 ? "0" : "5px",
  };
  const innerTextProps = {
    [displayFigure < 20 ? "left" : "right"]: displayFigure < 20 ? "5px" : "5px",
    color: "#ffffff",
  };

  return (
    <ProgressWrapper width={width}>
      <StatusValueText top="7px" color="black">
        {formatNumber(total - value)} to go
      </StatusValueText>
      <ProgressElement
        width={`${displayFigure}%`}
        progressColor={progressColor}
      >
        <StatusValueText {...innerTextProps}>{displayFigure}%</StatusValueText>
        <StatusValueText {...leftStatusTextProps} color="black">
          {formatNumber(value)}{" "}{progressStatusTxt ? progressStatusTxt : "transcribed"}
        </StatusValueText>
      </ProgressElement>
    </ProgressWrapper>
  );
};
