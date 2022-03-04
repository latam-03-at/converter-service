/*
@downloadFile.controller.js Copyright (c) 2022 Jalasoft
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

class DownloaFileController {
  
  //Receives the name of the file and returns the download link
  static downloadFile(req, res) {
    const { name } = req.params;
    const pathDownload = `${__dirname}/../../files/downloadFiles/${
      name.split('.')[0]
    }`;
    res.download(pathDownload + `/${name}`);
  }
}

module.exports = DownloaFileController;
