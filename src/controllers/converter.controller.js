/*
@converter.controller.js Copyright (c) 2022 Jalasoft
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft
*/

// Builds to convert files
class Converter {

    constructor() {
      if (this.constructor == Converter) {
        throw new Error('Error: Converter abstract class cannot be instantiated.');
      }
    }
    
    // Converts files
    convert() {
      throw new Error('Error: convert() must be implemented');
    }
  }
  
  module.exports = Converter;
