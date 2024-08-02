/**
 @author: Anthony D'Alesandro

  Creates api routes to the controller end points.
 */

const express = require('express')
const { catchErrors } = require('../../middleware/catch-errors');
const { requireAdmin} = require('../../middleware/auth');
const Controller = require('./controller')

// TODO: consolidate this into a single function?
const { uploadFiles, uploadPublic } = require('../../middleware/aws')

const router = express.Router();

router.post('/file', uploadFiles('file',true), catchErrors(Controller.UploadFile))
router.get('/file/:key', catchErrors(Controller.GetFile)) // TODO: change handle
router.get('/file', catchErrors(Controller.GetAllFiles)) // TODO: change handle
router.delete('/file/:key', catchErrors(Controller.DeleteFile))

module.exports = router;