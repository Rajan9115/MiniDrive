const express = require('express');
const router = express.Router();
const fileModel = require('../models/files.model');
const authMiddleware = require('../middlewares/authe');
const cloudinary = require('cloudinary').v2;

//function to upload files on cloudinary

//upload to cloudinary
async function uploadFileToCloudinary(file, folder) {
    const options = { folder };
    options.resource_type = "auto";
    console.log("Uploading with options:", options);
    return await cloudinary.uploader.upload(file.tempFilePath, options);
}




// HOME PAGE - Show all files for logged-in user
router.get('/files/partial', authMiddleware, async (req, res) => {
  try {
    const userFiles = await fileModel.find({ user: req.user.userId });
    res.render('files/partial', { files: userFiles });
  } catch (error) {
    console.error('Error fetching files:', error);
    res.status(500).send('Something went wrong while loading your files.');
  }
});

// Handle file upload
router.post('/upload', authMiddleware, async (req, res) => {
    try {
        if (!req.files || !req.files.file) {
            return res.status(400).json({ message: "No file uploaded" });
        }

        const file = req.files.file;

        // Upload to Cloudinary
        const result = await uploadFileToCloudinary(file, "MiniDrive");
        console.log("Here is your response:", result);

        // Save file info to database
        const newFile = await fileModel.create({
            path: result.secure_url,
            originalname: file.name,
            user: req.user.userId,
            public_id: result.public_id
        });

        res.json({
            success: true,
            url: result.secure_url,
            public_id: result.public_id
        });
    } catch (error) {
        console.error("Upload error:", error);
        res.status(500).json({ error: "File upload failed", details: error.message });
    }
});


// DOWNLOAD ROUTE
router.get('/download/:id', authMiddleware, async (req, res) => {
    try {
        const file = await fileModel.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!file) {
            return res.status(404).json({ message: 'File not found or unauthorized' });
        }
        
        let downloadUrl = file.path;
        
        // Redirect the user to the Cloudinary URL to initiate the download
        res.render('download', { downloadUrl });

    } catch (error) {
        console.error('Download error:', error);
        res.status(500).json({ error: 'Failed to process file download', message: error.message });
    }
});


module.exports = router;
