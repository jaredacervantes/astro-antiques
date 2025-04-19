const fs = require('fs');
const path = require('path');
const https = require('https');

// Create directories if they don't exist
const publicDir = path.join(__dirname, 'public');
const imagesDir = path.join(publicDir, 'images');

if (!fs.existsSync(publicDir)) {
  fs.mkdirSync(publicDir);
}

if (!fs.existsSync(imagesDir)) {
  fs.mkdirSync(imagesDir);
}

// Function to download an image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    https.get(url, (response) => {
      if (response.statusCode === 200) {
        const fileStream = fs.createWriteStream(filepath);
        response.pipe(fileStream);
        
        fileStream.on('finish', () => {
          fileStream.close();
          console.log(`Downloaded: ${filepath}`);
          resolve();
        });
      } else {
        reject(`Failed to download ${url}: ${response.statusCode}`);
      }
    }).on('error', (err) => {
      reject(`Error downloading ${url}: ${err.message}`);
    });
  });
}

// Images to download
const images = [
  {
    url: 'https://xfcpn2nyfb.ufs.sh/f/LKapUqCN3UFssgg9HORiwGqRQXjaOTYzH816lIkchyoC9txN',
    filename: 'logo.jpg'
  },
  {
    url: 'https://xfcpn2nyfb.ufs.sh/f/LKapUqCN3UFsr4yxADfxyDUaIJcwEtMh2GFSkA5vgYbPZ3R0',
    filename: 'hero.jpg'
  }
];

// Download all images
async function downloadAllImages() {
  console.log('Starting image downloads...');
  
  for (const image of images) {
    const filepath = path.join(imagesDir, image.filename);
    try {
      await downloadImage(image.url, filepath);
    } catch (error) {
      console.error(error);
    }
  }
  
  console.log('All downloads completed!');
}

downloadAllImages(); 