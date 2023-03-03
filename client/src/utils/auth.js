import decode from 'jwt-decode';

class AuthService {
  getProfile() {
    return decode(this.getToken());
  }

  loggedIn() {
    const token = this.getToken();
    // Si hay un token y no está vencido, devolver `true`
    return token && !this.isTokenExpired(token) ? true : false;
  }

  isTokenExpired(token) {
    // Decodificar el token para obtener su tiempo de vencimiento que estableció el servidor
    const decoded = decode(token);
    // Si el tiempo de vencimiento es menor que el tiempo actual (en segundos), el token está vencido y devolvemos `true`
    if (decoded.exp < Date.now() / 1000) {
      localStorage.removeItem('id_token');
      return true;
    }
    // Si el token no ha pasado su tiempo de vencimiento, devolver `false`
    return false;
  }

  getToken() {
    return localStorage.getItem('id_token');
  }

  login(idToken) {
    localStorage.setItem('id_token', idToken);
    window.location.assign('/');
  }

  logout() {
    localStorage.removeItem('id_token');
    window.location.reload();
  }
}

export default new AuthService();