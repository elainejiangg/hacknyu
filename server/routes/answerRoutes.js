const express = require("express");
const { flagQuestionPart } = require("../controllers/answerController");
const { isLoggedIn } = require("../middlewares/authMiddleware");
const router = express.Router();

router.put('/:questionPartId', isLoggedIn, flagQuestionPart)

//

module.exports = router;
