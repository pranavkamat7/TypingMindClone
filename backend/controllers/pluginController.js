const Plugin = require('../models/Plugin');

exports.getPlugins = async (req, res) => {
  const plugins = await Plugin.find();
  res.json(plugins);
};

exports.createPlugin = async (req, res) => {
  const plugin = new Plugin(req.body);
  await plugin.save();
  res.status(201).json(plugin);
};

exports.updatePlugin = async (req, res) => {
  const plugin = await Plugin.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(plugin);
};

exports.deletePlugin = async (req, res) => {
  await Plugin.findByIdAndDelete(req.params.id);
  res.json({ message: 'Plugin deleted' });
};
