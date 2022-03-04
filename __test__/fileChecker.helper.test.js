/*
@fileChecker.helper.test.js Copyright (c) 2022 Jalasoft
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const InvalidFileException = require('../src/Exceptions/invalidFile.exception');
const FileChecker = require('../src/helpers/fileChecker.helper');

FORMATS_SUPPORTED_IMAGE = ['jpg, jpeg, png'];

describe('File checker tests', () => {
  let env;

  beforeEach(() => {
    env = process.env;
    process.env.FORMATS_SUPPORTED_IMAGE = FORMATS_SUPPORTED_IMAGE;
  });

  test('Valid file extension', () => {
    const reqFileMock = {
      mimetype: 'image/jpg',
    };

    expect(() => FileChecker.uploadChecker(reqFileMock, 'IMAGE')).not.toThrow(
      InvalidFileException
    );
  });

  test('Invalid file extension', () => {
    const reqFileMock = {
      mimetype: 'video/mp4',
    };
    expect(() => FileChecker.uploadChecker(reqFileMock, 'IMAGE')).toThrow(
      InvalidFileException
    );
  });

  afterEach(() => {
    process.env = env;
  });
});
