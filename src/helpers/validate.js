import toast from "react-hot-toast";

// Import function to call authenticate endpoint API
import { authenticate } from "./helper";

// Validate login page username
async function usernameValidate(values) {
  const errors = usernameVerify({}, values);

  if (values.username) {
    // Check if the username exists or not
    const { status } = await authenticate(values.username);

    if (status !== 200) {
      errors.exist = toast.error("Username does not exist!");
    }
  }

  return errors;
}

// Validate login page password
async function passwordValidate(values) {
  const errors = passwordVerifY({}, values);

  return errors;
}

// Validate reset password page reset
async function resetPasswordValite(values) {
  const errors = passwordVerifY({}, values);

  if (values.password !== values.confirmPassword) {
    errors.exist = toast.error("Password does not match!");
  }

  return errors;
}

// Validate register page
async function registerValidate(values) {
  const errors = usernameVerify({}, values);
  passwordVerifY(errors, values);
  emailVerify(errors, values);

  return errors;
}

// Validate profile page
async function profileValidate(values) {
  const errors = emailVerify({}, values);

  return errors;
}

// Verify username
function usernameVerify(error = {}, values) {
  if (!values.username) {
    error.username = toast.error("Username is required!");
  } else if (values.username.includes(" ")) {
    error.username = toast.error("Invalid Username!");
  }

  return error;
}

// Verify email
function emailVerify(error = {}, values) {
  if (!values.email) {
    error.emai = toast.error("Email is required!");
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    error.email = toast.error("Invalid Email!");
  } else if (values.email.includes(" ")) {
    error.email = toast.error("Invalid Email!");
  }

  return error;
}

// Verify password
function passwordVerifY(error = {}, values) {
  const specialChars = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]+/;

  if (!values.password) {
    error.password = toast.error("Password is required!");
  } else if (values.password.length < 5) {
    error.password = toast.error("Password must be at least 5 characters!");
  } else if (values.password.includes(" ")) {
    error.password = toast.error("Wrong Password!");
  } else if (!specialChars.test(values.password)) {
    error.password = toast.error(
      "Password must contain at least one special character!"
    );
  }

  return error;
}

export {
  usernameValidate,
  passwordValidate,
  resetPasswordValite,
  registerValidate,
  profileValidate,
};
