/*
@hashGenerator.helper.test.js Copyright (c) 2022 Jalasoft
CI 26 Sur #48-41, Ayurá Center, Edificio Unión № 1376, Medellín, Colombia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const HashGenerator = require('../src/helpers/hashGenerator.helper');
const fs = require('fs');

describe('Test Compress', () => {

  test('Happy path', () => {
    const fileBuffer = fs.readFileSync(__dirname + '/files/fish.png');
    const result = HashGenerator.generateHashFile(fileBuffer);
    expect(result).toEqual('7e2a0cb0f11ad7baa174f85a79808fe3');
  });
});
