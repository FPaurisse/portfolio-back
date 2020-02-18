const express = require('express');
const slugify = require('slugify');

const router = express.Router();
const Work = require('../shemas/Work.model');

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
  // eslint-disable-next-line no-underscore-dangle
  await Work.findByIdAndUpdate({ _id: work._id }, { id: work._id });
  res.send(work);
});

// DATA TEST
const example = [
  {
    title: 'Premier titre',
    context: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation.',
    tools: 'React.js, Node.js',
    categories: 'web',
  },
];

router.get('/create', async (req, res) => {
  const work = new Work({
    slug: slugify(example[0].title, { lower: true }),
    title: example[0].title,
    context: example[0].context,
    tools: example[0].tools.split(/\s*,\s*/).map((tool) => tool.charAt(0).toUpperCase() + tool.slice(1)),
    categories: example[0].categories.split(/\s*,\s*/).map((category) => category.charAt(0).toUpperCase() + category.slice(1)),
  });
  await work.save();
  // eslint-disable-next-line no-underscore-dangle
  await Work.findByIdAndUpdate({ _id: work._id }, { id: work._id });
  res.send(work);
});

router.get('/delete', async (req, res) => {
  await Work.deleteOne();
  res.send('Example deleted');
});

module.exports = router;
