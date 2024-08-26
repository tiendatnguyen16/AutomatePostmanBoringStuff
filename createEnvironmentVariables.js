// Replace with your actual API key
const apiKey = '<your API Key>';
// Workspace ID
const workspaceId = '37d13948-c437-4443-8fda-47e70266908c';
// Base URL for the Postman API
const baseUrl = 'https://api.getpostman.com';

// Function to get all collections in the workspace
pm.sendRequest({
    url: `${baseUrl}/collections?workspace=${workspaceId}`,
    method: 'GET',
    header: {
        'X-Api-Key': apiKey
    }
}, function (err, response) {
    if (err) {
        console.error('Error fetching collections:', err);
    } 
    else {
            const collections = response.json().collections;
            console.log(collections);

            // Loop through the collections and set environment variables for days 8 to 30
            // This method will only work if the order of the collection is the same, for example, the 8th collection will be the 8th item in the collections property of the response
            for (let day = 8; day <= 30; day++) {
            const variableName = `day${day}_collectionUid`;
            const collectionUid = collections[day].uid;
                
            pm.environment.set(variableName, collectionUid);
            console.log(`Set environment variable ${variableName} to ${collectionUid}`);


            }
        }
    }
);
