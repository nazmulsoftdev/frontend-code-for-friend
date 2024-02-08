const PasswordValidation = (password) => {
  if (password.toString().split("").length > 5) {
    return true;
  } else {
    return false;
  }
};

export default PasswordValidation;
