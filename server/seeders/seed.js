const db = require('../config/connection');
// TODO: Add additional models as added
const { User, Goal } = require('../models');
const userSeeds = require('./userSeeds.json');
const goalSeeds = require('./goalSeeds.json');
const cleanDB = require('./cleanDB');

db.once('open', async () => {
  try {
    // Goal is modelName; goals is collectionName
    await cleanDB('Goal', 'goals');

    // User is modelName; users is collectionName
    await cleanDB('User', 'users');

    await User.create(userSeeds);

    // TODO: Amend lines 19-33 with relevant goal logic instead of thought logic from activity. Additonally add for other models (e.g. Collaborator, collaboratorSeeds, etc)
    for (let i = 0; i < goalSeeds.length; i++) {
      const { _id, goalAuthor } = await Goal.create(goalSeeds[i]);
      const user = await User.findOneAndUpdate(
        { username: goalAuthor },
        {
          $addToSet: {
            goals: _id,
          },
        }
      );
    }
  } catch (err) {
    console.error(err);
    process.exit(1);
  }

  console.log('all done!');
  process.exit(0);
});
