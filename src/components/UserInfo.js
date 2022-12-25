export default class UserInfo {
  constructor({ username, subtitleUser, userAvatar }) {
    this._name = document.querySelector(username);
    this._subtitle = document.querySelector(subtitleUser);
    this._avatar = document.querySelector(userAvatar)
  }
  getUserInfo() {
    return {
      name: this._name.textContent,
      subtitle: this._subtitle.textContent,
    }
  }

  setUserInfo(user) {
    this._name.textContent = user.name;
    this._subtitle.textContent = user.about;
    this._avatar.style.backgroundImage = `url(${user.avatar})`;
  }
}
