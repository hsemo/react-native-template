import { API_SCOPES, CLIENT_ID, REDIRECT_URI } from '@env';

const ApiUrls = {
  login: `https://accounts.google.com/o/oauth2/v2/auth?client_id=${CLIENT_ID}&redirect_uri=${REDIRECT_URI}&response_type=code&scope=${API_SCOPES}&access_type=offline&prompt=consent`,
  users: 'https://jsonplaceholder.typicode.com/users',
};

export default ApiUrls;
