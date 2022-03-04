/*
@fileValidator.middleware.js Copyright (c) 2022 Jalasoft
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft
*/

const File = require('../models/file.model');
const path = require('path');
const HashGenerator = require('../helpers/hashGenerator.helper');
const FileStorer = require('../helpers/fileStorer.helper');

// Represents a validator for uploaded file 
class FileValidator {

  // Validates one uploaded file if it exists in database
  static async validateUploadOneFile(req, res, next) {
    const { buffer: fileBuffer, mimetype } = req.file;
    const format = mimetype.split('/')[1];
    const fileHash = HashGenerator.generateHashFile(fileBuffer);

    try {
      const fileFound = await File.findOne({ hash: fileHash });
      const uploadPath = path.join(__dirname, '../../files/uploads/' + fileHash );
      const uploadSave = path.join(uploadPath,`${fileHash}.${format}`);
      
      if (fileFound) {
        req.file.path = uploadSave;
        return next();
      }
      
      FileStorer.storeFile(
        uploadPath,
        uploadSave,
        fileBuffer,
        fileHash
      ).then(() => {
        req.file.path = uploadSave;
        next();
      });

    } catch (error) {
      res.json({ error: 'Something went wrong when uploading file'});
    }
  }

  // Validates two uploaded files if they are exists in database
  static async validateUploadTwoFiles(req, res, next) {
    const { buffer: backgroundBuffer, mimetype: backgroundMimetype} = req.files.backgroundImage[0];
    const { buffer: imageBuffer, mimetype: imageMimetype } = req.files.images[0];
    const backgroundHash = HashGenerator.generateHashFile(backgroundBuffer);
    const imageHash = HashGenerator.generateHashFile(imageBuffer);
    const folderPath = path.join(__dirname, '../../files/uploads/');
    const imageFormat = imageMimetype.split('/')[1];
    const backgroundFormat = backgroundMimetype.split('/')[1];

    try {
      Promise.all([
        File.find({ hash: backgroundHash }), 
        File.find({ hash: imageHash })
      ]).then(image => {
        if (image[0].length === 0) {
          const backgroundFolder = path.join(folderPath, backgroundHash)
          const backgroundPath = path.join(backgroundFolder,`${backgroundHash}.${backgroundFormat}`);
          FileStorer.storeFile(
            backgroundFolder,
            backgroundPath,
            backgroundBuffer,
            backgroundHash
          );
          req.files.backgroundImage[0].path = backgroundPath;
        } else {
          req.files.backgroundImage[0].path = image[0][0].path;
        }
  
        if (image[1].length === 0) {
          const imageFolder = path.join(folderPath, imageHash)
          const imagePath = path.join(imageFolder,`${imageHash}.${imageFormat}`);
          FileStorer.storeFile(
            imageFolder,
            imagePath,
            imageBuffer,
            imageHash
          );
          req.files.images[0].path = imagePath;
        } else {
          req.files.images[0].path = image[1][0].path;
        }
        
        next();
      });
    } catch (error) {
      res.json({ error: 'Something went wrong when uploading file'});
    }
  }
}

module.exports = FileValidator;
