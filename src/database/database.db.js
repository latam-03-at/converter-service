/*
@database.db.js Copyright (c) 2022 Jalasoft
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const mongoose = require('mongoose');

// Represents a Mongo Database
class Database {
  
  constructor(uri, database){
    this._uri = uri;
    this.database = database;
  }

  // Connects to the data base
  async connectDatabase() {
    try {
      await mongoose.connect( this._uri + this.database, {
          useNewUrlParser: true,
          useUnifiedTopology: true,
      });
      console.log('it is connected on =>', this._uri + this.database)
    } catch (error) {
      console.log(error);
        throw new Error( 'There was an connection error.' );
    }
  }
}

module.exports = Database;
