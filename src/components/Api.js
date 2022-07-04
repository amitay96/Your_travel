class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }

    _checkResponse(res) {
      if(res.ok) return res.json();
      else return Promise.reject(res.statusText);
    }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
      }).then(this._checkResponse);
    }
  
    getUserInfo() {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers
      }).then(this._checkResponse);
    }

    setUserInfo(name, about) {
      return fetch(`${this._baseUrl}/users/me`, {
        headers: this._headers,
        method: "PATCH",
        body: JSON.stringify({
          name: name,
          about: about,
        }),
      }).then(this._checkResponse);
    }

    createCard(data) {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers,
        method: "POST",
        body: JSON.stringify(data)
    }).then(this._checkResponse);
   }
  }
  
  export const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
    headers: {
      authorization: "a987f557-c5fc-4df9-a055-4063817e4bf0",
      "Content-Type": "application/json"
    }
  });