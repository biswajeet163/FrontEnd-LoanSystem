export class LoggedUser{
    constructor(private _username:String, private _token: String){

    }

    get username(){
        return this._token;
    }

    get token(){
        return this._token;
    }
 

}