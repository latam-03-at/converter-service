/*
@videoConverter.model.js Copyright (c) 2022 Jalasoft
CI 26 Sur #48-41, Ayurá Center, Edificio Unión № 1376, Medellín, Colombia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const FfmpegCommand = require('fluent-ffmpeg');
const ConverterException = require('../Exceptions/converter.exception');
const Converter = require('./converter.model');

// Represents a model for convert Video into Images
class VideoConverter extends Converter {
  
  constructor(videoPath, savePath, fps, imageSize) {
    super();
    this._videoPath = videoPath;
    this._savePath = savePath;
    this._fps = fps;
    this._imageSize = imageSize;
  }

  // Allows to convert a video into an specif number of images by setting the Frames Per Second with an specific size, and extends from Converter abstract class
  async convert() {
    try {
      return await new Promise((resolve, reject) => {
        FfmpegCommand(this._videoPath)
          .size(this._imageSize)
          .fps(this._fps)
          .save(this._savePath)
          .on('error', () => {
            reject({ response: false });
          })
          .on('end', () => {
            resolve({ response: true });
          });
      });
    } catch {
      throw new ConverterException(
        'There was an error converting the video',
        'LATAM03'
      );
    }
  }
}

module.exports = VideoConverter;
