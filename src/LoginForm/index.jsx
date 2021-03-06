import { yupResolver } from "@hookform/resolvers/yup";
import { LinearProgress } from "@material-ui/core";
import Avatar from "@material-ui/core/Avatar";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import Container from "@material-ui/core/Container";
import CssBaseline from "@material-ui/core/CssBaseline";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Visibility from "@material-ui/icons/Visibility";
import VisibilityOff from "@material-ui/icons/VisibilityOff";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import InputField from "../components/form-controls/InputField";

const useStyles = makeStyles((theme) => ({
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    paddingTop: theme.spacing(3),
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  password: {
    position: "relative",
  },
  showPassword: {
    position: "absolute",
    top: "44px",
    right: "20px",
  },
  progress: {
    position: "absolute",
    top: theme.spacing(2),
    left: theme.spacing(3),
    right: theme.spacing(3),
  },
}));

export default function LoginForm(props) {
  const classes = useStyles();
  const schema = yup.object().shape({
    identifier: yup
      .string()
      .required("Please enter your email.")
      .email("Please enter a valid email address."),
    password: yup.string().required("Please enter your password."),
  });
  const form = useForm({
    defaultValues: {
      identifier: "",
      password: "",
    },
    resolver: yupResolver(schema),
  });
  const [showPassword, setShowPassword] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword((x) => !x);
  };
  const handleSubmit = async (values) => {
    const { onSubmit } = props;
    if (onSubmit) {
      await onSubmit(values);
    }
  };
  const { isSubmitting } = form.formState;

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        {isSubmitting && <LinearProgress className={classes.progress} />}
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log In
        </Typography>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className={classes.form}
          noValidate
        >
          <InputField
            form={form}
            id="identifier"
            label="Email Address"
            name="identifier"
            autoComplete="email"
          />
          <div className={classes.password}>
            <InputField
              form={form}
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              id="password"
              autoComplete="current-password"
            />
            <InputAdornment className={classes.showPassword} position="end">
              <IconButton
                aria-label="toggle password visibility"
                onClick={toggleShowPassword}
                edge="end"
              >
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          </div>
          <FormControlLabel
            required
            checked
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            disabled={isSubmitting}
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
          >
            Log In
          </Button>
        </form>
      </div>
    </Container>
  );
}
