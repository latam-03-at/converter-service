/*
@server.exception.js Copyright (c) 2022 Jalasoft
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

// Exception in case of invalid files
class ServerException extends Error {
  
  constructor(error, status, code) {
    super(error);
    this._status = status;
    this._code = code;
  }

  //gets the status of the error
  get status() {
    return this._status;
  }

  //gets the code of the error
  get code() {
    return this._code;
  }
}

module.exports = ServerException;
