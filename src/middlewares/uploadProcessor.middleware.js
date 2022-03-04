/*
@uploadProcessor.middleware.js Copyright (c) 2022 Jalasoft
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const multer = require('multer');

// Represents a processor of uploaded files
class UploadProcessor {
  
  // Process one file when uploading
  static processUploadFile() {
    const storage = multer.memoryStorage();
    const upload = multer({ storage }).single('file');
    return upload;
  }

  // Process two files when uploading
  static processUploadTwoFiles() {
    const storage = multer.memoryStorage();
    const upload = multer({ storage }).fields([
      { name: 'backgroundImage', maxCount: 1 },
      { name: 'images', maxCount: 1 },
    ]);
    return upload;
  }
}

module.exports = UploadProcessor;
