import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import signInWithGoogle, {
  authSignInWithEmailPassword,
} from "../../firebase/firebase.utils";

// import "./sign-in.styles.scss";
import {
  SignInContainer,
  SignInTitle,
  SignInButtonContainer,
} from "./sign-in.styles";

class SignIn extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;
    try {
      await authSignInWithEmailPassword(email, password);
      
      this.setState({ email: "", password: "" });
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Error in sign-in: ${errorCode}: ${errorMessage}`);
      // console.log(` Error in authSignInWithEmailPassword, ${errorCode}:${errorMessage}`);
    }
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    return (
      <SignInContainer>
        <SignInTitle>I already have an account</SignInTitle>
        <span>Sign in with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="email"
            type="email"
            value={this.state.email}
            label="email"
            required
            handleChange={this.handleChange}
          />
          <FormInput
            name="password"
            type="password"
            value={this.state.password}
            label="password"
            required
            handleChange={this.handleChange}
          />
          <SignInButtonContainer>
            <CustomButton type="submit">SIGN IN</CustomButton>
            <CustomButton
              type="button"
              onClick={signInWithGoogle}
              isGoogleSignIn
            >
              SIGN IN WITH GOOGLE
            </CustomButton>
          </SignInButtonContainer>
        </form>
      </SignInContainer>
    );
  }
}

export default SignIn;
