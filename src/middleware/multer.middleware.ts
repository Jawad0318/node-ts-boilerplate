// Multer strategy to upload images

import multer from 'multer';

// multer strategy for local uploading

const upload = multer({
    // to store images
    storage: multer.diskStorage({
        // defining the path where er have to store the image
        destination: function (_req, _file, cb) {
            cb(null, '/upload');
        },
        filename: function (_req, file, cb) {
            cb(null, `${Date.now()} - ${file.originalname}`);
            
        },
    }),
    //file size limit
    limits: {
        fileSize: 1024 * 1024 * 5,
    },
});

export { upload };