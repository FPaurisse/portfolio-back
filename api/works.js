const express = require('express');
const slugify = require('slugify');
const multer = require('multer');
const imageConverter = require('../utils/imageConverter');

const router = express.Router();
const Work = require('../shemas/Work.model');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'public/uploads');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}`);
  },
});

const upload = multer({ storage });

router.get('/', async (req, res) => {
  const works = await Work.find();
  res.json(works);
});

router.get('/:slug', async (req, res) => {
  const { slug } = req.params;
  const work = await Work.findOne({ slug });
  if (!work) {
    return res.status(404).send('Work not found');
  }
  return res.json(work);
});

router.post('/', upload.any(), async (req, res) => {
  const {
    title, primaryColor, secondaryColor, optionalColor, context, tools, categories,
  } = req.body;
  const { files } = req;

  imageConverter(files);
  const image = await files.find((file) => file.fieldname.includes('image'));
  const mockup = await files.find((file) => file.fieldname.includes('mockup'));

  const work = new Work({
    title,
    slug: slugify(title, { lower: true }),
    image: image.path.replace('public/uploads', 'uploads').concat('.png'),
    primaryColor,
    secondaryColor,
    optionalColor,
    mockup: mockup.path.replace('public/uploads', 'uploads').concat('.png'),
    context,
    tools: tools.split(/\s*,\s*/).map((tool) => tool.charAt(0).toUpperCase() + tool.slice(1)),
    categories: categories.split(/\s*,\s*/).map((category) => category.charAt(0).toUpperCase() + category.slice(1)),
  });
  await work.save();
  // eslint-disable-next-line no-underscore-dangle
  await Work.findByIdAndUpdate({ _id: work._id }, { id: work._id });
  res.send(work);
});


router.put('/:slug', upload.any(), async (req, res) => {
  const { slug } = req.params;
  const { files } = req;
  const {
    title, primaryColor, secondaryColor, optionalColor, context, tools, categories,
  } = req.body;

  const work = await Work.find({ slug });

  let imagePath;
  let mockupPath;
  if (files) {
    imageConverter(files);
    const currentImage = await files.find((file) => file.fieldname.includes('image'));
    const currentMockup = await files.find((file) => file.fieldname.includes('mockup'));
    imagePath = currentImage && currentImage.path.replace('public/uploads', 'uploads').concat('.png');
    mockupPath = currentMockup && currentMockup.path.replace('public/uploads', 'uploads').concat('.png');
  }

  const newWork = await Work.findOneAndUpdate({ slug },
    {
      title,
      slug: slugify(title, { lower: true }),
      image: imagePath || work[0].image,
      primaryColor,
      secondaryColor,
      optionalColor,
      mockup: mockupPath || work[0].mockup,
      context,
      tools: tools.split(/\s*,\s*/).map((tool) => tool.charAt(0).toUpperCase() + tool.slice(1)),
      categories: categories.split(/\s*,\s*/).map((category) => category.charAt(0).toUpperCase() + category.slice(1)),
    }, {
      new: true,
    });
  res.send(newWork);
});

router.delete('/:id', async (req, res) => {
  const { id } = req.params;
  await Work.deleteOne({ id });
  res.send(id);
});

module.exports = router;
