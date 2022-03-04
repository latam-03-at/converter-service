/*
@compositerAdapter.controller.js Copyright (c) 2022 Jalasoft
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft
*/

const CompositerController = require('./compositer.controller');
const Converter = require('./converter.controller');

//Adapt CompositerController to the Converter class structure
class CompositerAdapter extends Converter {

  //Converts files
  static convert(req, res) {
    CompositerController.compositeImages(req, res);
  }
}

module.exports = CompositerAdapter;
