export class UserInfo {
    constructor ({nameSelector, jobSelector}) {
        this._userName = document.querySelector(nameSelector);
        this._userJob = document.querySelector(jobSelector);
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
}