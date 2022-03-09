/*
@documentFileConverter.model.test.test.js Copyright (c) 2022 Jalasoft
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const ConverterException = require('../src/Exceptions/converter.exception');
const DocumentFileConverter = require('../src/models/documentFileConverter.model');
const fs = require('fs');

describe('Document Converter tests', () => {
  const saveDocumentPath = `${__dirname}/files/documentFilesFolder`;
  
  test('Document converted success', async () => {
    const documentFileConverter = new DocumentFileConverter(
      'pdf',
      __dirname + '/files/DocTest.docx',
      `${saveDocumentPath}`
    );

    expect(() => documentFileConverter.convert()).not.toThrow(
      ConverterException
    );
  });
});
