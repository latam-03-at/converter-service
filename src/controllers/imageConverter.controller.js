/*
@imageConverter.controller.js Copyright (c) 2022 Jalasoft
CI 26 Sur #48-41, Ayurá Center, Edificio Unión № 1376, Medellín, Colombia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const FileChecker = require('../helpers/fileChecker.helper');
const ConverterChecker = require('../models/converterChecker.facade');
const Converter = require('./converter.controller');
const { PORT, URL, URLBASE } = process.env;

// Controls the model that will be used to convert images
class ImageConverterController extends Converter {

  // Controls converterChecker and fileChecker's methods and return the response
  static convert(req, res) {
    const { format } = req.body;
    const inputPath = req.file.path;
    const fileName = req.file.originalname.split('.')[0];
    const savePath = `${__dirname}/../../files/downloadFiles/transform-${fileName}`;
    const params = { ...req.body, savePath, inputPath, fileName };

    try {
      FileChecker.uploadChecker(req.file, 'IMAGE');
    } catch (error) {
      res.status(error.status).send({
        error: error.message,
        code: error.code,
      });
      return;
    }

    ConverterChecker.convertImage(params)
      .then(() => {
        res.json({
          donwloadLink: `${URLBASE}${PORT}${URL}download/transform-${fileName}.${format}`,
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

module.exports = ImageConverterController;
