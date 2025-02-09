const {  } = require('../models');
// const axios = require('axios');
require('dotenv').config({ path: '../.env' });

exports.generateQuestion = async (req, res) => {

    // Access data from the middleware
    const features = req.features;

    try {
        const selectedFeatureNames = features.selected_feature_names;
        const nonSelectedFeatureNames = features.non_selected_feature_names;

        // Send the response back with the selected features
        res.status(200).json({
          category,
          selectedFeatureNames,
          nonSelectedFeatureNames
        });
      } catch (error) {
        console.error('Error generating question:', error);
        res.status(500).json({ message: 'Error generating question' });
      }
}
