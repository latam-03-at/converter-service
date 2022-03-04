/*
@compress.helper.js Copyright (c) 2022 Jalasoft
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const admzip = require('adm-zip');
const fs = require('fs');

 class Compress {
   
  //Receives a folder name and compresses it into a zip
  static compressFile(input, zipName) {
    const zip = new admzip();
    const folderName = `images-fps-${input.split('.')[0]}/`;
    zip.addLocalFolder(
      `${__dirname}/../../files/uploads/${folderName}`
    );
    const outputPath = `${__dirname}/../../files/downloadFiles/${
      zipName.split('.')[0]
    }`;
    fs.mkdirSync(outputPath, { recursive: true });
    fs.writeFileSync(outputPath + `/${zipName}`, zip.toBuffer());

    return true;
  }
};

module.exports = Compress;
