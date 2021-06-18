class Api {
  constructor({ address }) {
    this._address = address;
  }

  // получить карточки с сервера
  getInitialCards() {
    return fetch(`${this._address}/cards`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => this._checkAnswerCorrectness(response));
  }

  //получить информацию о пользователе с сервера
  getUserInformation() {
    return fetch(`${this._address}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => this._checkAnswerCorrectness(response));
  }

  //добавление карточки на сервер
  addCard(data) {
    return fetch(`${this._address}/cards`, {
      method: "POST",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link,
      }),
    }).then((response) => this._checkAnswerCorrectness(response));
  }

  //удаление карочек с сервера
  removeCard(id) {
    return fetch(`${this._address}/cards/${id}`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }).then((response) => this._checkAnswerCorrectness(response));
  }

  //добавить лайк карточке
  addLike(cardId) {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: "PUT",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    }).then((response) => this._checkAnswerCorrectness(response));
  }

  //удалить лайк у карточки
  deleteLike(cardId) {
    return fetch(`${this._address}/cards/${cardId}/likes`, {
      method: "DELETE",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-type": "application/json",
      },
    }).then((response) => this._checkAnswerCorrectness(response));
  }

  //добавить информацию о пользователе на сервер
  addUserInfo(data) {
    return fetch(`${this._address}/users/me`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about,
      }),
    }).then((response) => this._checkAnswerCorrectness(response));
  }

  //добавить аваторку на сервер
  addUserAvatar(data) {
    return fetch(`${this._address}/users/me/avatar`, {
      method: "PATCH",
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        avatar: data.avatar,
      }),
    }).then((response) => this._checkAnswerCorrectness(response));
  }

  _checkAnswerCorrectness(response) {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(`Ошибка ${response.status}`);
  }
}

const config = {
  address: "https://api.rakitskaya.mesto.nomoredomains.club",
};

const api = new Api(config);
export default api;
