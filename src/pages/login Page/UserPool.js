import { CognitoUserPool } from "amazon-cognito-identity-js";


const poolData = {
    UserPoolId:'us-east-1_woJEHcGED',
    ClientId: 'lji8sinp7on9cvmjcufpc4alh'
  }
  
  export default new CognitoUserPool(poolData);