const express = require('express');
const slugify = require('slugify');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');

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
  const work = await Work.find({ slug });
  res.json(work);
});

router.post('/', upload.any(), async (req, res) => {
  const { files } = req;
  req.files.map(async (file) => {
    await sharp(file.path)
      .resize(800, 800, {
        fit: sharp.fit.inside,
        withoutEnlargement: true,
        progressive: true,
      })
      .toFormat('png')
      .toFile(`public/uploads/${file.filename}.png`);
    fs.unlink(`public/uploads/${file.filename}`, (err) => {
      if (err) throw err;
    });
  });
  const image = await files.find((file) => file.fieldname.includes('image'));
  const mockup = await files.find((file) => file.fieldname.includes('mockup'));
  const {
    title, primaryColor, secondaryColor, optionalColor, context, tools, categories,
  } = req.body;
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

module.exports = router;
