import React from "react";

import FormInput from "../form-input/form-input.component";
import CustomButton from "../custom-button/custom-button.component";

import { authSignUpWithEmailPassword, createUserProfileDocument } from "../../firebase/firebase.utils";

// import "./sign-up.styles.scss";
import { SignUpContainer, SignUpTitle } from "./sugn-up.styles";

class SignUp extends React.Component {
  constructor() {
    super();

    this.state = {
      displayName: "",
      email: "",
      password: "",
      confirmPassword: "",
    };
  }

  handleSubmit = async (e) => {
    e.preventDefault();
    const { displayName, email, password, confirmPassword } = this.state;
    if (password !== confirmPassword) {
      alert("Passwords don't match");
      return;
    }
    try {
      await authSignUpWithEmailPassword(email, password, displayName);
      await createUserProfileDocument(email, password, displayName);
      this.setState({
        displayName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
    } catch (error) {
      // const errorCode = error.code;
      const errorMessage = error.message;
      alert(`Error in sign-up: ${errorMessage}`);
    }
  };

  handleChange = (e) => {
    const { value, name } = e.target;
    this.setState({ [name]: value });
  };

  render() {
    const { displayName, email, password, confirmPassword } = this.state;
    return (
      <SignUpContainer>
        <SignUpTitle>I do not have an account</SignUpTitle>
        <span>Sign up with your email and password</span>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            name="displayName"
            type="text"
            value={displayName}
            label="Display Name"
            required
            handleChange={this.handleChange}
          />
          <FormInput
            name="email"
            type="email"
            value={email}
            label="Email"
            required
            handleChange={this.handleChange}
          />
          <FormInput
            name="password"
            type="password"
            value={password}
            label="Password"
            required
            handleChange={this.handleChange}
          />
          <FormInput
            name="confirmPassword"
            type="password"
            value={confirmPassword}
            label="Confirm Password"
            required
            handleChange={this.handleChange}
          />
          <CustomButton type="submit">SIGN UP</CustomButton>
        </form>
      </SignUpContainer>
    );
  }
}

export default SignUp;
