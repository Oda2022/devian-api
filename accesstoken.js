const uniqueID = require('./uniqueID.js')
const axios = require('axios');
const {CLIENT_ID} = process.env;


const urlToken = 'https://www.deviantart.com/oauth2/authorize';

const data = new URLSearchParams({
    response_type: 'token',
    client_id: CLIENT_ID,
    redirect_uri: 'https://localhost:3000', // Reemplazar con tu propia redirect_uri
    state: uniqueID,
});

const authUrl = `${urlToken}?${data.toString()}`;


console.log('Redirecciona al usuario a la siguiente URL:');
console.log(authUrl);

// getCode().then(token => {
//     console.log(token);
//   }).catch(error => {
//     console.error('Error al obtener el token de acceso:', error);
//   });

module.exports = {
    sendResponse(req, res) {
        let dailyDeviationsURL = 'https://www.deviantart.com/api/v1/oauth2/browse/hot?access_token=';
        let holdAccessToken = '';
        getCode().then(response => {
            holdAccessToken = response;
        }).then(() => {
            axios.get(`${dailyDeviationsURL}${holdAccessToken}&limit=12`).then(response => {
                res.send(response.data);
            })
        })
    }
}