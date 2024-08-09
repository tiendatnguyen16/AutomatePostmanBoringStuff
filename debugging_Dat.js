const axios = require('axios');

const API_KEY = 'PMAK-668b482c89b08d00013a0780-38afe2fd58843dbfa1219c1bc75575ce69'; // Replace with your actual API key

const headers = {
  'X-Api-Key': API_KEY,
};

axios.get('https://api.getpostman.com/workspaces', { headers })
  .then(response => console.log(response.data))
  .catch(error => console.error('Error fetching workspaces:', error.response ? error.response.data : error.message));
