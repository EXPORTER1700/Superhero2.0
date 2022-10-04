import { IRegistrationData } from 'components/Registration/Registration';

const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;

export type RegistrationErrors = Record<keyof IRegistrationData, string[]>;

export const validateRegistration = (
  data: IRegistrationData,
): { isValid: boolean; errors: RegistrationErrors } => {
  const errors: Record<keyof IRegistrationData, string[]> = {
    email: [],
    username: [],
    password: [],
    confirmPassword: [],
  };
  const { email, username, password, confirmPassword } = data;

  const isValidEmail = emailRegex.test(email);

  const isPasswordCompare = password === confirmPassword;

  if (!isPasswordCompare) {
    errors.password.push('Passwords is not compare');
    errors.confirmPassword.push('Passwords is not compare');
  }

  if (!isValidEmail) {
    errors.email.push('This email is not valid');
  }

  if (username.trim().length < 6) {
    errors.username.push('This username is small');
  }

  if (password.trim().length < 6) {
    errors.password.push('This password is small');
  }

  const errorsValues = Object.values(errors);

  const isValid = !errorsValues.find((item) => item.length);

  return { isValid: isValid, errors };
};
