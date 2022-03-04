/*
@documentFileConverter.model.js Copyright (c) 2022 Jalasoft
CI 26 Sur #48-41, Ayurá Center, Edificio Unión № 1376, Medellín, Colombia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const ConverterException = require('../Exceptions/converter.exception');
const Converter = require('./converter.model');
const fsPromise = require('fs').promises;
const libre = require('libreoffice-convert');

// Represents a model for convert .docx files to .pdf
class DocumentFileConverter extends Converter {
  
  constructor(ext, inputPath, outputPath) {
    super();
    this._ext = ext;
    this._inputPath = inputPath;
    this._outputPath = outputPath;
  }

  // Allows to convert .docx files to .pdf
  async convert() {
    const file = await fsPromise.readFile(this._inputPath);

    return libre.convert(file, this._ext, undefined, async (err, done) => {
      if (err) {
        throw new ConverterException(
          'There was an error converting the file',
          'CS-LATAM03'
        );
      }
      fsPromise.writeFile(this._outputPath, done);
    });
  }
}

module.exports = DocumentFileConverter;
