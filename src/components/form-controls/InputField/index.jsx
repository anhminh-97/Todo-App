import React from "react";
import PropTypes from "prop-types";
import { TextField } from "@material-ui/core";
import { Controller } from "react-hook-form";

InputField.propTypes = {
  form: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  type: PropTypes.string,
  helperText: PropTypes.string,
  label: PropTypes.string,
  disabled: PropTypes.bool,
};

function InputField(props) {
  const { form, name, label, disabled, type } = props;
  const { errors } = form;
  const hasError = errors[name];
  return (
    <div>
      <Controller
        name={name}
        control={form.control}
        as={TextField}
        label={label}
        disabled={disabled}
        type={type}
        fullWidth
        variant="outlined"
        margin="normal"
        required
        error={!!hasError}
        helperText={errors[name]?.message}
      />
    </div>
  );
}

export default InputField;
