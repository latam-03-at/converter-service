/*
@file.model.js Copyright (c) 2022 Jalasoft
CI 26 Sur #48-41, Ayurá Center, Edificio Unión № 1376, Medellín, Colombia
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const { Schema, model } = require('mongoose');

// Represents the file collection in mongodb
const fileSchema = Schema({
    hash: {
        type: String,
        required: [true, 'The hash is requeried.']    
    },
    path: {
        type: String,
        required: [true, 'The path is requeried.'],
    }
});

module.exports = model( 'File', fileSchema );
