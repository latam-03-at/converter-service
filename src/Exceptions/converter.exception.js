/*
@converter.exception.js Copyright (c) 2022 Jalasoft
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const ServerException = require("./server.exception");

// Exception for converter methods
class ConverterException extends ServerException {

  constructor(message, code){
    super(message, '404' , code);
  }
}

module.exports = ConverterException;
