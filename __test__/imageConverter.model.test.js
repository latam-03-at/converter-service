/*
@imageConverter.model.test.js Copyright (c) 2022 Jalasoft
CI 26 Sur #48-41, Ayurá Center, Edificio Unión № 1376, Medellín, Colombia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const ImageConverter = require('../src/models/imageConverter.model');
const path = require('path');

describe('Test Image Converter', () => {

  test('Happy path', async () => {
    const imageConverter = new ImageConverter(
      __dirname + '/files/ocean.jpg',
      __dirname + '/files/image-converter-test',
      { width: 100, high: 250 },
      'jpg',
      360,
      true,
      false,
      false
    );

    const result = await imageConverter.convert();
    const { response } = result;
    expect(response).toBe(true);
  });

  test('Valid input aspect ratio: width', async () => {
    const imageConverter = new ImageConverter(
      __dirname + '/files/ocean.jpg',
      __dirname + '/files/image-converter-test',
      { width: 500 },
      'jpg',
      360,
      false,
      false,
      false
    );

    const result = await imageConverter.convert();
    const { response } = result;
    expect(response).toBe(true);
  });

  test('Invalid input aspect ratio:', async () => {
    const imageConverter = new ImageConverter(
      __dirname + '/files/ocean.jpg',
      __dirname + '/files/image-converter-test',
      { width: '500' },
      'jpg',
      360,
      false,
      false,
      false
    );
    expect(() => imageConverter.composite().toThrow(ConverterExecption));
  });

  test('Valid input rotate', async () => {
    const imageConverter = new ImageConverter(
      __dirname + '/files/ocean.jpg',
      __dirname + '/files/image-converter-test',
      { width: 500 },
      'jpg',
      80,
      false,
      false,
      false
    );

    const result = await imageConverter.convert();
    const { response } = result;
    expect(response).toBe(true);
  });

  test('Invalid input rotate', async () => {
    const imageConverter = new ImageConverter(
      __dirname + '/files/ocean.jpg',
      __dirname + '/files/image-converter-test',
      { width: '500' },
      'jpg',
      '',
      false,
      false,
      false
    );
    expect(() => imageConverter.composite().toThrow(ConverterExecption));
  });

  test('Valid input format', async () => {
    const imageConverter = new ImageConverter(
      __dirname + '/files/ocean.jpg',
      __dirname + '/files/image-converter-test',
      { width: 500 },
      'png',
      300,
      false,
      false,
      false
    );

    const result = await imageConverter.convert();
    const { response } = result;
    expect(response).toBe(true);
  });

  test('Invalid input rotate', async () => {
    const imageConverter = new ImageConverter(
      __dirname + './files/ocean.jpg',
      __dirname + './files/image-converter-test',
      { width: '500' },
      'jpg',
      '',
      false,
      false,
      false
    );
    expect(() => imageConverter.composite().toThrow(ConverterExecption));
  });

  test('Valid input gray scale', async () => {
    const imageConverter = new ImageConverter(
      __dirname + '/files/ocean.jpg',
      __dirname + '/files/image-converter-test',
      { width: 500 },
      'jpeg',
      null,
      true,
      false,
      false
    );

    const result = await imageConverter.convert();
    const { response } = result;
    expect(response).toBe(true);
  });

  test('Invalid input gray scale', async () => {
    const imageConverter = new ImageConverter(
      __dirname + '/files/ocean.jpg',
      __dirname + '/files/image-converter-test',
      { width: '500' },
      'jpg',
      null,
      '',
      false,
      false
    );
    expect(() => imageConverter.composite().toThrow(ConverterExecption));
  });

  test('Valid input mirror effect', async () => {
    const imageConverter = new ImageConverter(
      __dirname + '/files/ocean.jpg',
      __dirname + '/files/image-converter-test',
      { width: 500 },
      'jpeg',
      null,
      false,
      true,
      false
    );

    const result = await imageConverter.convert();
    const { response } = result;
    expect(response).toBe(true);
  });

  test('Valid input negative effect', async () => {
    const imageConverter = new ImageConverter(
      __dirname + '/files/ocean.jpg',
      __dirname + '/files/image-converter-test',
      { width: 500 },
      'jpeg',
      null,
      false,
      false,
      true
    );

    const result = await imageConverter.convert();
    const { response } = result;
    expect(response).toBe(true);
  });
})
