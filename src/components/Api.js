class Api {
    constructor({baseUrl, headers}) {
      this._baseUrl = baseUrl;
      this._headers = headers;
    }
  
    getInitialCards() {
      return fetch(`${this._baseUrl}/cards`, {
        headers: this._headers
      })
      .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
      .catch(res => console.log(res));
      
    }
  
    getUserInfo() {
        return fetch(`${this._baseUrl}/users/me`, {
            headers: this._headers
          })
          .then(res => res.ok ? res.json() : Promise.reject(res.statusText))
          .catch(res => console.log(res));
    }
  }
  
  export const api = new Api({
    baseUrl: "https://around.nomoreparties.co/v1/cohort-3-en",
    headers: {
      authorization: "a987f557-c5fc-4df9-a055-4063817e4bf0",
      "Content-Type": "application/json"
    }
  });