/*
@imageConverter.model.js Copyright (c) 2022 Jalasoft
CI 26 Sur #48-41, Ayurá Center, Edificio Unión № 1376, Medellín, Colombia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const sharp = require('sharp');
const ConverterException = require('../Exceptions/converter.exception');
const Converter = require('./converter.model');

// Builds to convert image type file and extends from the Converter abstract class
class ImageConverter extends Converter {
  
  constructor(
    videoPath,
    savePath,
    size,
    format,
    rotate,
    isActiveGrayscale,
    isActiveMirrorEffect,
    isActiveNegative
  ) {
    super();
    this._videoPath = videoPath;
    this._savePath = savePath;
    this._size = size;
    this._format = format;
    this._rotate = rotate;
    this._isActiveGrayscale = isActiveGrayscale;
    this._isActiveMirrorEffect = isActiveMirrorEffect;
    this._isActiveNegative = isActiveNegative;
  }

  // Allows to convert image taking into account format, resize, mirror effect, rotate, grayscale, negative, and extends from Converter abstract class
  async convert() {
    try {
      return sharp(this._videoPath)
        .resize(this._size.width, this._size.height)
        .toFormat(this._format)
        .rotate(this._rotate, { background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .flop(this._isActiveMirrorEffect)
        .grayscale(this._isActiveGrayscale)
        .negate(this._isActiveNegative)
        .toFile(this._savePath + '.' + this._format)
        .then((data) => {
          return { response: true, data };
        });
    } catch {
      throw new ConverterException(
        'There was an error converting the image',
        'LATAM03'
      );
    }
  }
}

module.exports = ImageConverter;
