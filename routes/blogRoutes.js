const express = require('express')
const blogController = require('../controllers/blogControllers')

const router = express.Router();

router.get('/',blogController.blog_index)
router.post('/',blogController.blog_details)
router.get('/:id',blogController.get_single_blog)
router.delete('/:id',blogController.delete_single_blog)


module.exports = router