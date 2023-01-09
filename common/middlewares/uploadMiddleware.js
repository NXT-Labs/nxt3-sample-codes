const multer = require("multer");
const { imageFilter } = require("../../utils/upload.utils");

const storage = multer.memoryStorage();

const uploadSiteLogo = multer({
  fileFilter: imageFilter,
  limits: {
    fileSize: 31457280, //30MB
  },
  storage: storage,
});

const uploadGameThumbnail = multer({
  fileFilter: imageFilter,
  limits: {
    fileSize: 31457280, //30MB
  },
  storage: storage,
});

const uploadMessageImage = multer({
  fileFilter: imageFilter,
  limits: {
    fileSize: 31457280, //30MB
  },
  storage: storage,
});

const uploadGameMultiple = multer({
  fileFilter: imageFilter,
  limits: {
    fileSize: 31457280, //30MB
  },
  storage: storage,
});

const uploadThumbnail = multer({
  fileFilter: imageFilter,
  limits: {
    fileSize: 31457280, //10MB
  },
  storage: storage,
});

module.exports = {
  uploadSiteLogo,
  uploadGameThumbnail,
  uploadThumbnail,
  uploadGameMultiple,
  uploadMessageImage,
};
