export const validateName = (nameInput) => {
  const maxNameLength = 12;
  return nameInput.length >= maxNameLength;
};

export const validateEmail = (emailInput) => {
  const validEmail = /\S+@\S+\.\S+/;
  return validEmail.test(emailInput);
};

export const validatePassword = (passwordInput) => {
  const minPasswordLength = 6;
  return passwordInput.length >= minPasswordLength;
};
