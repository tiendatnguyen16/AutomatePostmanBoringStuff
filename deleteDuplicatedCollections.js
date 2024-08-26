const axios = require('axios');

const API_KEY = 'PMAK-668b482c89b08d00013a0780-38afe2fd58843dbfa1219c1bc75575ce69'; // Replace with your actual API key
//const SOURCE_WORKSPACE_ID = '8df6c5ba-1e69-4e8b-967e-382ce4130eeb'; // Replace with your source workspace ID
const DESTINATION_WORKSPACE_ID = '9ebef898-7c0a-4fcb-8afa-377443f73021'; // Replace with your destination workspace ID 

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

async function deleteCollection(collectionUid) {
  const url = `https://api.getpostman.com/collections/${collectionUid}`;
  try {
    await axios.delete(url, { headers });
    console.log(`Deleted collection with UID: ${collectionUid}`);
  } catch (error) {
    console.error(`Error deleting collection ${collectionUid}:`, error.response ? error.response.data : error.message);
    throw error;
  }
}

async function removeDuplicates(workspaceId) {
  try {
    const collections = await getCollections(workspaceId);
    const uniqueCollections = {};

    for (const collection of collections) {
      if (uniqueCollections[collection.name]) {
        // Delete duplicate collection
        console.log(`Found duplicate: ${collection.name}`);
        await deleteCollection(collection.uid);
      } else {
        uniqueCollections[collection.name] = collection.uid;
      }
    }

    console.log('Duplicate removal completed.');
  } catch (error) {
    console.error('Error in removeDuplicates function:', error.message);
  }
}

async function main() {
  try {
    await removeDuplicates(DESTINATION_WORKSPACE_ID);
  } catch (error) {
    console.error('Error in main function:', error.message);
  }
}

main();
