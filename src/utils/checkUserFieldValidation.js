export const checkUserFieldValidation = (userField = []) => {
  const verifyData = userField.map((item) => item !== "");

  if (verifyData.indexOf(false) == -1) {
    return true;
  } else {
    return false;
  }
};
