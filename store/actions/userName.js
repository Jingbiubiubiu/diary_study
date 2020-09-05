export const UPDATA_USERNAME = 'UPDATA_USERNAME';

export const updateUserName = (email) => {
  return {
    type: UPDATA_USERNAME,
    Email: email,
  };
};
