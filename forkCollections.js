

const axios = require('axios');

const API_KEY = '<your API Key>'; // Replace with your actual API key
const SOURCE_WORKSPACE_ID = '<source workspace ID>'; // Replace with your source workspace ID
const DESTINATION_WORKSPACE_ID = '<destination workspace ID>'; // Replace with your destination workspace ID

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

    // if (totalCollections < 31) {
    //   console.log(`Only ${totalCollections} collections found. Cannot fork from 11th to 31st.`);
    //   return;
    // }

    // Fork collections from the 11th to the 31st
    for (let i = 1; i < totalCollections; i++) { 
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
