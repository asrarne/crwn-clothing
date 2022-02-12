import React, { useState } from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import {
  googleSignInStart,
  emailSignInStart,
} from "../../redux/user/user-actions";
import { selectErrorMessage } from "../../redux/user/user-selectors";

import {
  SignInContainer,
  SignInTitle,
  SignInError,
  SignInButtonContainer,
} from "./sign-in.styles";

const SignIn = ({
  emailSignInStart,
  googleSignInStart,
  selectErrorMessage,
}) => {
  const [ userCredentials, setUserCredentials] = useState({
    email: '',
    password: ''
  });
  const {email, password} = userCredentials;

  const handleSubmit = (e) => {
    e.preventDefault();
    // const { email, password } = this.state;

    emailSignInStart(email, password);
    setUserCredentials({
      email: '',
    password: ''
    })
  };

  const handleChange = (e) => {
    const { value, name } = e.target;
    setUserCredentials({...userCredentials, [name]: value});
  };

  return (
    <SignInContainer>
      <SignInTitle>I already have an account</SignInTitle>
      <span>Sign in with your email and password</span>
      {selectErrorMessage && <SignInError>{selectErrorMessage}</SignInError>}
      <form onSubmit={handleSubmit}>
        <FormInput
          name="email"
          type="email"
          value={email}
          label="email"
          required
          handleChange={handleChange}
        />
        <FormInput
          name="password"
          type="password"
          value={password}
          label="password"
          required
          handleChange={handleChange}
        />
        <SignInButtonContainer>
          <CustomButton type="submit">SIGN IN</CustomButton>
          <CustomButton
            type="button"
            onClick={googleSignInStart}
            isGoogleSignIn
          >
            SIGN IN WITH GOOGLE
          </CustomButton>
        </SignInButtonContainer>
      </form>
    </SignInContainer>
  );
};

const mspStateToProps = createStructuredSelector({
  selectErrorMessage: selectErrorMessage,
});

const mapDispatchToProps = (dispatch) => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) =>
    dispatch(emailSignInStart({ email, password })),
});

export default connect(mspStateToProps, mapDispatchToProps)(SignIn);
