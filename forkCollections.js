/* 
const axios = require('axios');

// Replace with your Postman API key
const apiKey = 'PMAK-668b482c89b08d00013a0780-38afe2fd58843dbfa1219c1bc75575ce69';

// Replace with the public workspace ID
const publicWorkspaceId = 'f1c6b0a9-b930-4165-9aa4-f655dd7051b5';

// Replace with the destination workspace ID
const destinationWorkspaceId = '37d13948-c437-4443-8fda-47e70266908c';
*/

const axios = require('axios');

const API_KEY = 'PMAK-668b482c89b08d00013a0780-38afe2fd58843dbfa1219c1bc75575ce69'; // Replace with your actual API key
const SOURCE_WORKSPACE_ID = 'f1c6b0a9-b930-4165-9aa4-f655dd7051b5'; // Replace with your source workspace ID
const DESTINATION_WORKSPACE_ID = '37d13948-c437-4443-8fda-47e70266908c'; // Replace with your destination workspace ID

const headers = {
  'X-Api-Key': API_KEY,
  'Content-Type': 'application/json',
};

async function getCollections(workspaceId) {
  try {
    const response = await axios.get(`https://api.getpostman.com/collections?workspace=${workspaceId}`, { headers });
    return response.data.collections;
  } catch (error) {
    console.error('Error fetching collections:', error.response ? error.response.data : error.message);
    throw error;
  }
}

async function forkCollection(collectionUid, destinationWorkspaceId) {
  const url = `https://api.getpostman.com/collections/fork/${collectionUid}?workspace=${destinationWorkspaceId}`;
  const payload = {
    label: `Forked Version of ${collectionUid}`, // Label for the forked collection
  };

  try {
    const response = await axios.post(url, payload, { headers });
    return response.data;
  } catch (error) {
    console.error(`Error forking collection ${collectionUid}:`, error.response ? error.response.data : error.message);
    throw error;
  }
}

async function main() {
  try {
    const collections = await getCollections(SOURCE_WORKSPACE_ID);
    const totalCollections = collections.length;

    console.log(`Total Collections Found: ${totalCollections}`);

    if (totalCollections < 31) {
      console.log(`Only ${totalCollections} collections found. Cannot fork from 11th to 31st.`);
      return;
    }

    // Fork collections from the 11th to the 31st
    for (let i = 10; i <= 30; i++) { // <= 30 to include the 31st collection
      const collection = collections[i];
      console.log(`Attempting to fork Collection UID: ${collection.uid} (${collection.name})`);
      const forkedCollection = await forkCollection(collection.uid, DESTINATION_WORKSPACE_ID);
      console.log(`Forked Collection: ${forkedCollection.collection.name}`);
    }
  } catch (error) {
    console.error('Error in main function:', error.message);
  }
}

main();
