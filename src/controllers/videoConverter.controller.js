/*
@videoConverter.controller.js Copyright (c) 2022 Jalasoft
CI 26 Sur #48-41, Ayurá Center, Edificio Unión № 1376, Medellín, Colombia
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const Compress = require('../helpers/compress.helper');
const FileChecker = require('../helpers/fileChecker.helper');
const ConverterChecker = require('../models/converterChecker.facade');
const Converter = require('./converter.controller');
const { PORT, URL, URLBASE } = process.env;

// Controls the model that will be used to convert videos
class VideoConverterController extends Converter {
  
   // Controls converterChecker and fileChecker's methods and return the response
  static convert(req, res) {
    const { originalname } = req.file;
    const folderVideoName = `video-${originalname.split('.')[0]}/`;
    const folderImageName = `images-fps-${originalname.split('.')[0]}/`;
    const saveVideoPath = `${__dirname}/../../files/uploads/${folderVideoName}`;
    const saveImagesPath = `${__dirname}/../../files/uploads/${folderImageName}`;

    const params = { ...req.body, saveVideoPath, saveImagesPath };

    try {
      FileChecker.uploadChecker(req.file, 'VIDEO');
    } catch (error) {
      res.status(error.status).send({
        error: error.message,
        code: error.code,
      });
      return;
    }

    ConverterChecker.convertVideo(params, req)
      .then(() => {
        const zipName = `${Date.now()}-${originalname.split('.')[0]}.zip`;
        Compress.compressFile(originalname, zipName);
        res.json({
          donwloadLink: `${URLBASE}${PORT}${URL}download/${zipName}`,
        });
      })
      .catch((error) => {
        res.status(error.status).send({
          error: error.message,
          code: error.code,
        });
      });
  }
}

module.exports = VideoConverterController;
