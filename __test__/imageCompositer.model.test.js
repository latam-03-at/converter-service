/*
@imageCompositer.model.test.js Copyright (c) 2022 Jalasoft
CI 26 Sur #48-41, Ayurá Center, Edificio Unión № 1376, Medellín, Colombia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const ImageCompositer = require('../src/models/imageCompositer.model');
const ConverterExecption = require('../src/Exceptions/converter.exception');

describe('Test Image Compositer', () => {

  test('Happy path', async () => {
    const imageCompositer = new ImageCompositer(
      __dirname + '/files/ocean.jpg',
      [{ input: __dirname + '/files/fish.png', top: 200, left:250 }],
      __dirname + '/files/test-image',
      'jpeg'
    );
    const result = await imageCompositer.composite();
    expect(result).toEqual({
      response: true,
      image: { format: 'jpeg', width: 1500, height: 1000, size: 166303 }
    });
  });

  test('Invalid input backgroundImage: empty', async () => {
    const imageCompositer = new ImageCompositer(
      '',
      [{ input: __dirname + './files/fish.png', top: 200, left:250 }],
      __dirname + './files/test-image',
      'jpeg'
    );
    expect(() => imageCompositer.composite().toThrow(ConverterExecption));
  });

  test('Invalid input backgroundImage: number', async () => {
    const imageCompositer = new ImageCompositer(
      100,
      [{ input: __dirname + './files/fish.png', top: 200, left:250 }],
      __dirname + './files/test-image',
      'jpeg'
    );
    expect(() => imageCompositer.composite().toThrow('There was an error converting the file'));
  });

  test('Invalid input image: empty', async () => {
    const imageCompositer = new ImageCompositer(
      __dirname + './files/ocean.jpg',
      [],
      __dirname + './files/test-image',
      'jpeg'
    );
    expect(() => imageCompositer.composite().toThrow(ConverterExecption));
  });

  test('Invalid input image: number', async () => {
    const imageCompositer = new ImageCompositer(
      __dirname + './files/ocean.jpg',
      100,
      __dirname + './files/test-image',
      'jpeg'
    );
    expect(() => imageCompositer.composite().toThrow(ConverterExecption));
  });

  test('Invalid input Save Path: empty', async () => {
    const imageCompositer = new ImageCompositer(
      __dirname + './files/ocean.jpg',
      [{ input: __dirname + './files/fish.png', top: 200, left:250 }],
      '',
      'jpeg'
    );
    expect(() => imageCompositer.composite().toThrow(ConverterExecption));
  });

  test('Invalid input Save Path: number', async () => {
    const imageCompositer = new ImageCompositer(
      __dirname + './files/ocean.jpg',
      [{ input: __dirname + './files/fish.png', top: 200, left:250 }],
      100,
      'jpeg'
    );
    expect(() => imageCompositer.composite().toThrow(ConverterExecption));
  });

  test('Invalid input image format: empty', async () => {
    const imageCompositer = new ImageCompositer(
      __dirname + './files/ocean.jpg',
      [{ input: __dirname + './files/fish.png', top: 200, left:250 }],
      __dirname + './files/test-image',
      ''
    );
    expect(() => imageCompositer.composite().toThrow(ConverterExecption));
  });

  test('Invalid input image format: number', async () => {
    const imageCompositer = new ImageCompositer(
      __dirname + './files/ocean.jpg',
      [{ input: __dirname + './files/fish.png', top: 200, left:250 }],
      __dirname + './files/test-image',
      100
    );
    expect(() => imageCompositer.composite().toThrow(ConverterExecption));
  });
});
