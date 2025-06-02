const express = require('express');
const router = express.Router();
const pluginController = require('../controllers/pluginController');

router.get('/', pluginController.getPlugins);
router.post('/', pluginController.createPlugin);
router.put('/:id', pluginController.updatePlugin);
router.delete('/:id', pluginController.deletePlugin);

module.exports = router;
