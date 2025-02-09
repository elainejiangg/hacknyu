const { UserCategory, Category, Feature } = require('../models');

// category chosen should be weighted by user exp in each category and some amount of randomness
exports.getRandomCategoryForUser = async(req, res, next) => {
    try {
        console.log('i am in getrandomcategoryforuser')
        const userCategories = await UserCategory.findAll({
            where: {user_id: req.userId},
            include: [{
                model: Category,
                as: 'category',
                attributes: ['id', 'name']
            }]
        })

        if (userCategories.length === 0) {
            return res.status(404).json({ error: 'No categories associated with this user. User not registered properly.' });
        }

        // calculate a weighted score for each of the user categories based on exp
        const categoryScores = userCategories.map((userCategory) => {
            const exp = userCategory.exp;  // User's experience in this category
            const category = userCategory.category;

            // Random factor: The factor will be between 0.5 and 1.5 to introduce some randomness
            const randomness = Math.random() + 0.5;  // Randomness between 0.5 and 1.5

            // Calculate the weighted score based on the inverse of experience and randomness
            const score = (1 / (exp + 1)) * randomness;  // Lower exp = higher score

            return { category_id: category.id, score };
          });
        console.log('category scores: ', categoryScores)
        // find the max score to normalize the weights
        const maxScore = Math.max(...categoryScores.map(score => score.score));

        // Normalize the scores so they sum up to 1 (like probabilities)
        const normalizedScores = categoryScores.map((categoryScore) => {
            const normalizedScore = categoryScore.score / maxScore;
            return { category_id: categoryScore.category_id, normalizedScore };
        });
        console.log('normalized scores: ', normalizedScores)

        // Choose the next category based on the normalized score (weighted random choice)
        const totalScore = normalizedScores.reduce((sum, score) => sum + score.normalizedScore, 0);

        const randomSelection = Math.random() * totalScore;

        let accumulatedScore = 0;
        for (const category of normalizedScores) {
        accumulatedScore += category.normalizedScore;
        if (accumulatedScore >= randomSelection) {
            // Attach the selected category to the request object
            req.selectedCategoryId = category.category_id;
            // return res.status(200).json({ category: category })
            console.log('req.selectedCategoryId: ', req.selectedCategoryId)
            next();
            }
        }

    } catch (error) {
        console.error('Error fetching next category for user:', error);
        throw error;
    }
}


exports.getRandomFeaturesForCategory = async (req, res, next) => {
    try {
      console.log('i am in getrandomfeatures')
      const categoryId = req.selectedCategoryId;  // Category ID is already set by previous middleware

      // Fetch all features under the given category_id
      const allFeatures = await Feature.findAll({
        where: { category_id: categoryId }
      });

      if (allFeatures.length === 0) {
        req.features = {
          selected_feature_ids: [],
          selected_feature_names: [],
          non_selected_feature_ids: [],
          non_selected_feature_names: []
        };
        next();  // Move to the next middleware or route handler
      }

      // Randomly determine how many features to select (between 1 and all available)
      const numToSelect = Math.floor(Math.random() * allFeatures.length) + 1;

      // Shuffle the features array randomly
      const shuffledFeatures = allFeatures.sort(() => Math.random() - 0.5);

      // Select the first `numToSelect` features from the shuffled array
      const selectedFeatures = shuffledFeatures.slice(0, numToSelect);
      const nonSelectedFeatures = shuffledFeatures.slice(numToSelect);

      req.features = {
        selected_feature_ids: selectedFeatures.map(feature => feature.id),
        selected_feature_names: selectedFeatures.map(feature => feature.name),
        non_selected_feature_ids: nonSelectedFeatures.map(feature => feature.id),
        non_selected_feature_names: nonSelectedFeatures.map(feature => feature.name)
      };
      console.log('req.features: ', req.features)

      next();  // Pass control to the next middleware or route handler
    } catch (error) {
      console.error('Error fetching random features:', error);
      return res.status(500).json({ message: 'Error fetching features' });
    }
  };
