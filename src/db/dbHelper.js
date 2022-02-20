import {Users} from './dbConnector'


export function checkUserNameUnique(username){
    return Users.findOne({username:username})
}


export function loginUser(username,password){
    return Users.findOne({username:username,password:password})
}
