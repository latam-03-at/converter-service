/*
@imageCompositer.model.js Copyright (c) 2022 Jalasoft
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const sharp = require('sharp');
const ConverterException = require('../Exceptions/converter.exception');

// Builds an image that is constructed from two
class ImageCompositer {
  
  constructor(backgroundImage, images, savePath, format) {
    this._backgroundImage = backgroundImage;
    this._images = images;
    this._savePath = savePath;
    this._format = format;
  }

  // Composites images over one image
  async composite() {
    try {
      return sharp(this._backgroundImage)
        .composite(this._images)
        .toFormat(this._format)
        .toFile(this._savePath + '.' + this._format)
        .then((image) => {
          const { format, width, height, size } = image;
          return { response: true, image: { format, width, height, size } };
        });
    } catch (error) {
      throw new ConverterException(
        'There was an error converting the file',
        'LATAM03'
      );
    }
  }
}

module.exports = ImageCompositer;
