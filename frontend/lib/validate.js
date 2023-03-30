export default function login_validate(values) {
  const errors = {};
  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }
  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Password cannot contain spaces";
  }
  return errors;
}

export function register_validate(values) {
  const errors = {};

  if (!values.email) {
    errors.email = "Email is required";
  } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
    errors.email = "Invalid email address";
  }

  if (!values.password) {
    errors.password = "Password is required";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters";
  } else if (values.password.includes(" ")) {
    errors.password = "Password cannot contain spaces";
  }

  if (!values.cpassword) {
    errors.cpassword = "Confirm Password is required";
  } else if (values.cpassword !== values.password) {
    errors.cpassword = "Passwords must match";
  }

  return errors;
}
