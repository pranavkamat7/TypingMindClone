const mongoose = require('mongoose');

const pluginSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  version: String,
  enabled: { type: Boolean, default: true }
});

module.exports = mongoose.model('Plugin', pluginSchema);
