const express = require('express');
const path = require('path');
const fs = require('fs');

const app = express();
const port = 3000;

// Folder where images are stored
const imagesFolder = path.join(__dirname, 'photos');

// Serve static files (images, css, js)
app.use(express.static(__dirname));

// Route to get all image filenames from the folder
app.get('/images', (req, res) => {
    fs.readdir(imagesFolder, (err, files) => {
        if (err) {
            return res.status(500).send('Unable to scan directory');
        }
        // Filter and send only image files (e.g., .webp)
        const images = files.filter(file => file.endsWith('.webp'));
        res.json(images);
    });
});

// Serve the HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
