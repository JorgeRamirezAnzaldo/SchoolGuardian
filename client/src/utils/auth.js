//Import decode from jwt-decode
import decode from 'jwt-decode';

//Define AuthService class
class AuthService {
  //Get user data
  getProfile() {
    return decode(this.getToken());
  }
  //Verify if the user is logged in
  loggedIn() {
    //Get token
    const token = this.getToken();
    //Validate if there is a token and has not expired 
    return token && !this.isTokenExpired(token) ? true : false;
  }
  //Verify if token has expired
  isTokenExpired(token) {
    //Decode the token to get the expiration time
    const decoded = decode(token);
    //Validate if the token has expired, remove it from localStorage and return true
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    //If the token has not expired return false
    return false;
  }
  //Get the token of the user from localStorage
  getToken() {
    return localStorage.getItem('id_token');
  }
  //Save the token in localStorage when logging in
  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }
  //Delete the token in localStorage when logging out
  logout() {
    localStorage.removeItem('id_token');
    window.location.assign('/');
  }
}

//Export AuthService
export default new AuthService();