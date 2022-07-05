export class UserInfo {
    constructor ({nameSelector, jobSelector, imageSelector}) {
        this._userName = document.querySelector(nameSelector);
        this._userJob = document.querySelector(jobSelector);
        this._userImage = document.querySelector(imageSelector);
    }

    getUserInfo() {
        return {
            name: this._userName.textContent,
            job: this._userJob.textContent
        };
    }

    setUserInfo(name, job) {
        this._userName.textContent = name;
        this._userJob.textContent = job;
    }

    setUserImage(image) {
        this._userImage.src = image;
    }

    setImageVisible() {
        this._userImage.style.visibility = "visible";
    }
}