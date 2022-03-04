/*
@compositer.controller.js Copyright (c) 2022 Jalasoft
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

const ImageCompositer = require('../models/imageCompositer.model');
const FileChecker = require('../helpers/fileChecker.helper');
const fs = require('fs');
const path = require('path');
const { PORT, URL, URLBASE } = process.env;

// Composes images
class CompositerController {
  
  // Executes and verifies the response of the 3 methods involved in the project
  static async compositeImages(req, res) {
    const top = Number(req.body.top);
    const left = Number(req.body.left);
    const format = req.body.format;
    const backgroundImage = req.files.backgroundImage[0];
    const image = req.files.images[0];
    const images = [{ input: image.path, top, left }];
    const compositeName = `${image.originalname.split('.')[0]}-${
      backgroundImage.originalname.split('.')[0]
    }`;
    
    const downloadPath = path.join(__dirname, `../../files/downloadFiles/`);
    const newFolder = `${downloadPath}composite-${compositeName}`;
    const savePath = `${newFolder}/composite-${compositeName}`;
    
    try {
      FileChecker.uploadChecker(backgroundImage, 'IMAGE');
      FileChecker.uploadChecker(image, 'IMAGE');

      fs.mkdirSync(newFolder, { recursive: true });

      const imageCompositer = new ImageCompositer(
        backgroundImage.path,
        images,
        savePath,
        format
      );

      const result = await imageCompositer.composite();
      res.json({
        donwloadLink: `${URLBASE}${PORT}${URL}download/composite-${compositeName}.${format}`,
      });
    } catch (error) {
      res.status(error.status).send({
        error: error.message,
        code: error.code,
      });
    }
  }
}

module.exports = CompositerController;
