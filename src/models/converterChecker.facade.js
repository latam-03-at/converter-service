/*
@converterChecker.facade.js Copyright (c) 2022 Jalasoft
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const fs = require('fs');
const ImageConverter = require('./imageConverter.model');
const VideoConverter = require('./videoConverter.model');
const DocumentFileConverter = require('./documentFileConverter.model');

// Contains methods that checks converter models
class ConverterChecker {
  
  //Verifies the convert image process
  static async convertImage(params) {
    const {
      width,
      height,
      format,
      rotate,
      isActiveGrayScale,
      isActiveMirrorEffect,
      isActiveNegative,
      savePath,
      fileName,
      inputPath,
    } = params;

    const size = {
      width: Number(width) || null,
      height: Number(height) || null,
    };

    fs.mkdirSync(savePath, { recursive: true });

    const convertImage = new ImageConverter(
      inputPath,
      `${savePath}/transform-${fileName}`,
      size,
      format,
      Number(rotate),
      isActiveGrayScale == 'true',
      isActiveMirrorEffect == 'true',
      isActiveNegative == 'true'
    );

    await convertImage.convert();
  }

  //Verifies the convert video process
  static async convertVideo(params, req) {
    const { fps, imageSize, saveVideoPath, saveImagesPath } = params;
    fs.mkdirSync(saveVideoPath, { recursive: true });
    fs.mkdirSync(saveImagesPath, { recursive: true });

    const convertVideo = new VideoConverter(
      req.file.path,
      `${saveImagesPath}/%3d.jpg`,
      Number(fps),
      imageSize
    );

    await convertVideo.convert();
  }

  //Verifies the convert document process
  static async convertDocFile(params) {
    const { ext, inputPath, outputPath } = params;

    const convertDocumentFile = new DocumentFileConverter(
      ext,
      inputPath,
      outputPath
    );

    await convertDocumentFile.convert();
  }
}

module.exports = ConverterChecker;
