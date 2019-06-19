const baseUrl = 'http://192.168.100.106:8000';

const loginUrl = baseUrl + '/api/accounts/login/';

const signUpUrl = baseUrl + '/api/accounts/signup/';

const homeUrl = baseUrl + '/api/models/home/';

const passwordresetUrl = baseUrl + '/api/accounts/password/reset/';

const SearchUrl = baseUrl + '/api/models/Product/';

const editProfileUrl = baseUrl + '/api/models/edit-profile/';

export default {
  baseUrl,
  loginUrl,
  signUpUrl,
  homeUrl,
  passwordresetUrl,
  SearchUrl,
  editProfileUrl
};
