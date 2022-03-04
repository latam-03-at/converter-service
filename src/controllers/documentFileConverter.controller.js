/*
@documentFileConverter.controller.js Copyright (c) 2022 Jalasoft
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
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

// Controls the model that will be used to convert .docx files to .pdf files
class DocFileConverterController extends Converter {
  
  // Controls converterChecker and fileChecker's methods and return the response
  static convert(req, res) {
    const { originalname } = req.file;
    const ext = '.pdf';
    const folderPath = `${__dirname}/../../files/uploads/application-${
      originalname.split('.')[0]
    }`;
    const inputPath = `${folderPath}/${originalname}`;
    const outputPath = `${folderPath}/${originalname.split('.')[0]}${ext}`;

    const params = { ext, inputPath, outputPath };

    try {
      FileChecker.uploadChecker(req.file, 'DOC');
      ConverterChecker.convertDocFile(params).then(() =>
        res.json({ message: 'Converted successfully' })
      );
    } catch (error) {
      res.status(error.status).send({
        error: error.message,
        code: error.code,
      });
    }
  }
}

module.exports = DocFileConverterController;
