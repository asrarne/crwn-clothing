import React from "react";

import {
  GroupContainer,
  FormInputContainer,
  InputLabel,
} from "./form-input.styles";

const FormInput = ({ handleChange, label, ...otherProps }) => (
  <GroupContainer>
    <FormInputContainer onChange={handleChange} {...otherProps} />
    {label ? (
      <InputLabel className={otherProps.value.length ? "shrink" : ""}>
        {label}
      </InputLabel>
    ) : null}
  </GroupContainer>
);

export default FormInput;
