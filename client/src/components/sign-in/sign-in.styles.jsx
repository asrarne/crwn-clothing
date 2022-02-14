import styled, { css } from "styled-components";

const commonStyle = css`
  margin: 10px 0;
`;

export const SignInContainer = styled.div`
  width: 380px;
  display: flex;
  flex-direction: column;
`;

export const SignInTitle = styled.h2`
  ${commonStyle}
`;

export const SignInError = styled.span`
  color: red;
  ${commonStyle};
`;

export const SignInButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;
