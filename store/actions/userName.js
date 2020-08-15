export const UPDATA_USERNAME = 'UPDATA_USERNAME';

export const updateUserName = (
  // studyId,
  email
) => {
  return {
    type: UPDATA_USERNAME,
    Email: email,
  };
};
