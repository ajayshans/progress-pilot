// Obtained from Activity 26, however, probably not required - DON'T RUN npm run seed
const models = require('../models');
const db = require('../config/connection');

module.exports = async (modelName, collectionName) => {
  try {
    let modelExists = await models[modelName].db.db.listCollections({
      name: collectionName
    }).toArray()

    if (modelExists.length) {
      await db.dropCollection(collectionName);
      console.log(`The collection ${collectionName} has successfully been dropped.`)
    } else {
      console.log(`The collection ${collectionName} does not exist.`)
    }
  } catch (err) {
    console.error(`Error whilst dropping collection '${collectionName}': ${err.message}`);
    throw err;
  }
}