const express = require('express');
const slugify = require('slugify');

const router = express.Router();
const Work = require('../models/Work.model');

router.get('/', async (req, res) => {
  const works = await Work.find();
  res.json(works);
});

router.post('/', async (req, res) => {
  const {
    title, context, tools, categories,
  } = req.body;
  const work = new Work({
    slug: slugify(title, { lower: true }),
    title,
    context,
    tools: tools.split(/\s*,\s*/).map((tool) => tool.charAt(0).toUpperCase() + tool.slice(1)),
    categories: categories.split(/\s*,\s*/).map((category) => category.charAt(0).toUpperCase() + category.slice(1)),
  });
  await work.save();
  res.send(work);
});

module.exports = router;
