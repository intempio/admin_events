import auth0 from 'auth0-js'
import EventEmitter from 'events'
import authConfig from '../auth_config.json'
import 'rxjs';
import {authService} from '../services/auth-service'

const webAuth = new auth0.WebAuth({
  domain: authConfig.domain,
  redirectUri: `${window.location.origin}/callback`,
  clientID: authConfig.clientId,
  audience: authConfig.audience, // add the audience
  responseType: 'token id_token', // request 'token' as well as 'id_token'
  scope: 'openid profile email'
});

const localStorageKey = 'loggedIn'
const loginEvent = 'loginEvent'

class AuthService extends EventEmitter {
  idToken = null;
  profile = null;
  tokenExpiry = null;
  accessToken = null;
  accessTokenExpiry = null;

  // Starts the user login flow
  login(customState) {
    webAuth.authorize({
      appState: customState
    })
  }

  // Handles the callback request from Auth0
  handleAuthentication() {
    return new Promise((resolve, reject) => {
      webAuth.parseHash((err, authResult) => {
        if (err) {
          reject(err)
        } else {
          this.localLogin(authResult)
          resolve(authResult.idToken)
        }
      })
    })
  }

  localLogin(authResult) {
    console.log(authResult);
    this.idToken = authResult.idToken
    this.profile = authResult.idTokenPayload
    this.tokenExpiry = new Date(this.profile.exp * 1000)
    this.accessToken = authResult.accessToken

    // Convert expiresIn to milliseconds and add the current time
    // (expiresIn is a relative timestamp, but an absolute time is desired)
    this.accessTokenExpiry = new Date(Date.now() + authResult.expiresIn * 1000)

    authService.setSession(authResult);

    this.emit(loginEvent, {
      loggedIn: true,
      profile: authResult.idTokenPayload,
      state: authResult.appState,
      token: authResult.idToken
    })
  }

  renewTokens() {
    return new Promise((resolve, reject) => {
      if (localStorage.getItem(localStorageKey) !== 'true') {
        return reject('Not logged in')
      }

      webAuth.checkSession({}, (err, authResult) => {
        if (err) {
          reject(err)
        } else {
          this.localLogin(authResult)
          resolve(authResult)
        }
      })
    })
  }

  logOut() {
    this.idToken = null
    this.tokenExpiry = null
    this.profile = null
    authService.terminateSession();

    webAuth.logout({
      returnTo: window.location.origin + '/login'
    })

    this.emit(loginEvent, { loggedIn: false })
  }

  isAuthenticated() {
    const user = JSON.parse(localStorage.getItem('user'));
    const userRoles = JSON.parse(localStorage.getItem('user_roles'));
    if (user) {
      this.profile = user;
    }
    return !!this.profile;
  }

  // ... other methods

  isAccessTokenValid() {
    return (
      this.accessToken &&
      this.accessTokenExpiry &&
      Date.now() < this.accessTokenExpiry
    )
  }

  getAccessToken() {
    return new Promise((resolve, reject) => {
      if (this.isAccessTokenValid()) {
        resolve(this.accessToken)
      } else {
        this.renewTokens().then(authResult => {
          resolve(authResult.accessToken)
        }, reject)
      }
    })
  }
}

export default new AuthService()
