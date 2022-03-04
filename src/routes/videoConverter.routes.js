/*
@videoConvert.routes.js Copyright (c) 2022 Jalasoft
2643 Av Melchor Perez de Olguin Colquiri Sud, Cochabamba, Bolivia.
Av. General Inofuentes esquina Calle 20,Edificio Union № 1376, La Paz, Bolivia
All rights reserved.
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const { Router } = require('express');
const router = Router();
const VideoConverterController = require('../controllers/videoConverter.controller');
const FileValidator = require('../middlewares/fileValidator.middleware');
const UploadProcessor = require('../middlewares/uploadProcessor.middleware');

const upload = require('../middlewares/multer.middleware')
router.post('/', upload(), VideoConverterController.convert);

module.exports = router;
