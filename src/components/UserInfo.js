export default class UserInfo {
  constructor({ username, subtitleUser }) {
    this._name = document.querySelector(username);
    this._subtitle = document.querySelector(subtitleUser);
  }
  getUserInfo() {
    return {
      username: this._name.textContent,
      usersubtitle: this._subtitle.textContent,
    }
  }

  setUserInfo(user) {
    this._name.textContent = user.username;
    this._subtitle.textContent = user.usersubtitle;
  }
}
