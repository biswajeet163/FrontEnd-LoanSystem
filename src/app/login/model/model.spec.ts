// import { LoginResponse } from "./loginResponse";



// fdescribe('LoginResponseModel', () => {
//     let model: LoginResponse;
    
//     beforeEach(() => {
//         model = new LoginResponse("Biswa","xdsfdsvfd456", new Date(), "admin");
//     });


//     it('should be created', () => {
//         expect(model).toBeTruthy();
//     });

//     it('Getting user', () => {
//         // Arrange
//         model['_username'] = "Deepak";

//         // Act
//         let user = model.username;
//         // Assert
//         expect(user).toEqual("Deepak");

//     })

//     it('Getting token', () => {
//         // Arrange
//         model['_token'] = "dsfdsfasdas";

//         // Act
//         let tokens = model.token;
//         // Assert
//         expect(tokens).toEqual("dsfdsfasdas");

//     })

//     it('Getting Validation Date', () => {
//         // Arrange 
//         let myDate  = new Date();
//         model['_validUpTo'] = myDate

//         // Act
//         let validDate = model.valiUpTo;
//         // Assert 
//         expect(validDate).toEqual(myDate);

//     })


//     it('Getting role', () => {
//         // Arrange
//         model['_role'] = "admin";

//         // Act
//         let role = model.role;
//         // Assert
//         expect(role).toEqual("admin");

//     })


   

// });