const Model = require('../models/Model');

exports.getModels = async (req, res) => {
  const models = await Model.find();
  res.json(models);
};

exports.createModel = async (req, res) => {
  const model = new Model(req.body);
  await model.save();
  res.status(201).json(model);
};

exports.updateModel = async (req, res) => {
  const model = await Model.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(model);
};

exports.deleteModel = async (req, res) => {
  await Model.findByIdAndDelete(req.params.id);
  res.json({ message: 'Model deleted' });
};
