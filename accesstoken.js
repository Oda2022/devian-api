
const axios = require('axios');
const {CLIENT_ID, CLIENT_SECRET} = process.env;

const getCode = () => {

    const auth = {
        client_id: CLIENT_ID,
        client_secret: CLIENT_SECRET
    }

    const data = new URLSearchParams();
    data.append('grant_type','client_credentials')

    return axios.post('https://www.deviantart.com/oauth2/token', data, {
        auth: auth }).then(response => {
        return response.data.access_token;
        
    })
}

getCode().then(token => {
    console.log(token);
  }).catch(error => {
    console.error('Error al obtener el token de acceso:', error);
  });

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