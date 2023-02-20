class Api {
  constructor({ baseUrl, headers }) {
    this._headers = headers;
    this._baseUrl = baseUrl;
  }

  getData(res) {
    if (res.ok) {
      return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`);
  }

  getInitialCards() {
    return fetch(`${this._baseUrl}/cards`, {
      headers: this._headers,
    }).then(this.getData);
  }

  getUserAvatar() {
    return fetch(`${this._baseUrl}/users/me`, {
      headers: this._headers,
    }).then(this.getData);
  }

  editUserProfile(username, usersubtitle) {
    return fetch(`${this._baseUrl}/users/me`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify({
        name: username,
        about: usersubtitle,
      }),
    }).then(this.getData);
  }

  addLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "PUT",
      headers: this._headers,
    }).then(this.getData);
  }

  deleteLike(id) {
    return fetch(`${this._baseUrl}/cards/${id}/likes`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.getData);
  }

  addCard(name, link) {
    return fetch(`${this._baseUrl}/cards`, {
      method: "POST",
      headers: this._headers,
      body: JSON.stringify({
        name,
        link,
      }),
    }).then(this.getData);
  }

  deleteCard(id) {
    return fetch(`${this._baseUrl}/cards/${id}`, {
      method: "DELETE",
      headers: this._headers,
    }).then(this.getData);
  }

  updateProfilePicture(avatar) {
    return fetch(`${this._baseUrl}/users/me/avatar`, {
      method: "PATCH",
      headers: this._headers,
      body: JSON.stringify(avatar),
    }).then(this.getData);
  }
  changeLikeCardStatus(id, isLiked) {
    if (isLiked) {
      return this.addLike(id);
    }
    return this.deleteLike(id);
  }
}

export const api = new Api({
  baseUrl: "https://mesto.nomoreparties.co/v1/cohort-55",
  headers: {
    authorization: "c7d34d7c-8f2f-49ad-9eaf-560bcef6adbb",
    "Content-Type": "application/json",
  },
});
