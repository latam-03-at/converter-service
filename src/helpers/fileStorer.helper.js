/*
@hashGenerator.helper.js Copyright (c) 2022 Jalasoft
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

const File = require('../models/file.model')
const fs = require('fs');
const InternalError = require('../Exceptions/internalError.exception');

// Represent a storer to save the uploaded files
class FileStorer {
  
  // Stores the file data in the sever
  static async storeFile(folderPath, uploadSave, fileBuffer, fileHash) {
    fs.mkdirSync(folderPath, { recursive: true });
    fs.writeFile (uploadSave, fileBuffer, async(error) => {
      if (!error) {
        const file = new File({
          hash: fileHash,
          path: uploadSave
        });
        try {
          await file.save();
        } catch (error) {
          throw new InternalError(
            'There was an error saving file in MongoDB',
            'LATAM03'
          );
        }
       return; 
      }
      throw new InternalError(
        'There was an error saving file infolder',
        'LATAM03'
      );
    });
  }
}

module.exports = FileStorer;
