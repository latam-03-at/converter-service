/*
@fileChecker.helper.js Copyright (c) 2022 Jalasoft
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const InvalidFileException = require('../Exceptions/invalidFile.exception');

// Contains a method that check the extension of the files
class FileChecker {
  
  // Receives the video from the server and saves it in the "files" local file
  static uploadChecker(params, type) {
    let { mimetype } = params;

    if (mimetype.endsWith('document')) {
      mimetype = 'file/docx';
    }
    const formatSupported = process.env[`FORMATS_SUPPORTED_${type}`];

    if (!formatSupported.includes(mimetype.split('/')[1])) {
      throw new InvalidFileException(
        'The file is an Invalid File',
        'CS-LATAM03'
      );
    }
  }
}

module.exports = FileChecker;
