const sharp = require('sharp');
const fs = require('fs');

module.exports = (images) => images.map(async (file) => {
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
