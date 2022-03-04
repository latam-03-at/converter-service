/*
@converter.model.js Copyright (c) 2022 Jalasoft
CI 26 Sur #48-41, Ayurá Center, Edificio Unión № 1376, Medellín, Colombia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

// Builds to convert files and inherits to ImageConverter and VideoConverter
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
