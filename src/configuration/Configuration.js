import axios from 'axios'

export function addNewUser(Object){

    return axios({
        method: 'post',
        url:'http://localhost:8080/fundoonote/user',
        data:{
            firstName: Object.firstName,
            lastName: Object.lastName,
            gender: Object.gender,
            phoneNumber: Object.phoneNumber,
            email: Object.email,
            password: Object.password
        }
    })
}

export function verifyUser(Object){

    return axios({
        method: 'post',
        url:'http://localhost:8080/fundoonote/login',
        data:{
            email: Object.email,
            password: Object.password
        }
    })
}

export function sendLink(email){
    return axios({
        method: 'get',
        url:'http://localhost:8080/fundoonote/forgot-password?email='+email
    })
}

export function changePassword(Object){

    // const formData = new FormData();
    // formData.append('password', Object.newPassword);
    return axios({
        method: 'post',
        url: 'http://localhost:8080/fundoonote/change-password?token='+Object.userToken,
       data: {password: Object.newPassword},
        
    })
}

