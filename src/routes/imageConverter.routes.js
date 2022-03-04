/*
@imageConverter.routes.js Copyright (c) 2022 Jalasoft
CI 26 Sur #48-41, Ayurá Center, Edificio Unión № 1376, Medellín, Colombia
All rights reserved
This software is the confidential and proprietary information of
Jalasoft Confidential Information You shall not
disclose such Confidential Information and shall use it only in
accordance with the terms of the license agreement you entered into
with Jalasoft.
*/

const { Router } = require('express');
const router = Router();
const ImageConverterController = require('./../controllers/imageConverter.controller');
const FileValidator = require('../middlewares/fileValidator.middleware');
const UploadProcessor = require('../middlewares/uploadProcessor.middleware');

const upload = require('../middlewares/multer.middleware')
router.post('/', upload(), ImageConverterController.convert);

module.exports = router;
