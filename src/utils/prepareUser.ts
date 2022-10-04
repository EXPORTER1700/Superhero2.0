import { IRegistrationData } from 'components/Registration/Registration';

export const prepareUser = (registrationData: IRegistrationData) => {
  return {
    id: Date.now(),
    email: registrationData.email,
    username: registrationData.username,
    password: registrationData.password,
    heroPack: [],
    powerUps: {
      updatedAt: new Date(),
      intelligence: 5,
      strength: 5,
      speed: 5,
      durability: 5,
      power: 5,
      combat: 5,
    },
  };
};
