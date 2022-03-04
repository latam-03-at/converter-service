/*
@compositeMulter.middleware.js Copyright (c) 2022 Jalasoft
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

const multer = require('multer');
const fs = require('fs');

//Process the user request and saves a file in a destination
const uploadCompositeMiddllware = () => {
  
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      const pathFile = `${__dirname}/../../files/uploads/composite-${
        file.originalname.split('.')[0]
      }/`;
      fs.mkdirSync(pathFile, { recursive: true });
      cb(null, pathFile);
    },
    filename: (req, file, cb) => {
      cb(null, file.originalname);
    },
  });

  return multer({ storage }).fields([
    { name: 'backgroundImage', maxCount: 1 },
    { name: 'images', maxCount: 1 },
  ]);
};

module.exports = uploadCompositeMiddllware;
