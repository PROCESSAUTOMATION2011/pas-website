const fs = require('fs');
const path = require('path');
const pngToIco = require('png-to-ico');

const srcPng = path.join(__dirname, '..', 'src', 'assets', 'pas-logo.png');
const outIco = path.join(__dirname, '..', 'public', 'favicon.ico');

pngToIco(srcPng)
  .then(buf => {
    fs.writeFileSync(outIco, buf);
    console.log('favicon.ico generated at public/favicon.ico');
  })
  .catch(err => {
    console.error('Error generating favicon:', err);
    process.exit(1);
  });
