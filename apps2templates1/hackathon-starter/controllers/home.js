const fs = require('fs');
exports.index = (req, res) => {
  images = [];

  fs.readdirSync('./public/uploads').forEach(file => {
    console.log(file);
    images.push(file)
  })

  console.log(images)
  res.render('home', {
    title: 'Home',
    images
  });
};
