
export class LoginResponse {

    constructor(
      
        public _username: String,
        public _token: String, 
        public _validUpTo: Date,
        public _role:String ) { } 

        get username(){
            return this._username;
        } 
 
        get token(){
            return this._token;
        } 

        get valiUpTo(){
            return this._validUpTo;
        }

        get role(){
            return this._role;
        } 
    
}
 