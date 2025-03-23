const express = require('express');
const path = require('path');
const fs = require('fs');
const cors = require('cors');
const app = express();
const port = 3004;
const photosFolder = path.join(__dirname, 'photos');
app.use(cors())
app.get('/api/photos', (req, res) => {
    fs.readdir(photosFolder, (err, files) => {
        if (err) return res.status(500).json({ error: "Error reading directory" });

        const photoData = files.map(file => {
            const filePath = path.join(photosFolder, file);
            const imageData = fs.readFileSync(filePath).toString('base64');

            return `data:image/${path.extname(file).substring(1)};base64,${imageData}`;
        });

        res.json(photoData);
    });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
