/*
@videoConverter.model.test.js Copyright (c) 2022 Jalasoft
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const VideoConverter = require('../src/models/videoConverter.model');
const fs = require('fs');

describe('Video Converter tests', () => {
  const saveImagesPath = `${__dirname}/files/videoFilesFolder`;

  beforeAll(() => {
    fs.mkdirSync(saveImagesPath, { recursive: true });
  });

  test('Video success', async () => {
    const videoConverter = new VideoConverter(
      `${__dirname}/files/videoTest.mp4`,
      `${saveImagesPath}/%3d.jpg`,
      1,
      '100%'
    );
    const result = await videoConverter.convert();
    const { response } = result;

    expect(response).toBe(true);
  });

  test('Invalid video file', async () => {
    const videoConverter = new VideoConverter(
      `${__dirname}/files/DocTest.docx`,
      `${saveImagesPath}/%3d.jpg`,
      1,
      '100%'
    );
    const success = jest.fn();
    const rejected = jest.fn();
    await videoConverter.convert().then(success).catch(rejected);

    expect(success).not.toHaveBeenCalled();
    expect(rejected).toHaveBeenCalled();
  });

  test('videoPath parameter empty', async () => {
    const videoConverter = new VideoConverter(
      '',
      `${saveImagesPath}/%3d.jpg`,
      1,
      '100%'
    );
    const success = jest.fn();
    const rejected = jest.fn();
    await videoConverter.convert().then(success).catch(rejected);

    expect(success).not.toHaveBeenCalled();
    expect(rejected).toHaveBeenCalled();
  });

  test('fps parameter empty', async () => {
    const videoConverter = new VideoConverter(
      `${__dirname}/files/videoTest.mp4`,
      `${saveImagesPath}/%3d.jpg`,
      '',
      '100%'
    );
    const success = jest.fn();
    const rejected = jest.fn();
    await videoConverter.convert().then(success).catch(rejected);

    expect(success).not.toHaveBeenCalled();
    expect(rejected).toHaveBeenCalled();
  });

  afterAll(() => {
    setTimeout(() => {
      fs.rmSync(saveImagesPath, { recursive: true, force: true });
    }, 5000);
  });
});
