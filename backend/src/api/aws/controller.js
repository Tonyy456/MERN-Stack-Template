/**
    @author: Anthony D'Alesandro

    Methods available to the client.
*/

require('dotenv').config()
const { listFiles, deleteFile } = require('../../middleware/aws')

const Controller = {
    UploadFile: async function (req, res) {
        return res.status(200).json({
            file: `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${req.files[0].key}`
        })
    },
    GetFile: async function (req, res) {
        return res.status(200).json({})
    }, // not even needed? maybe for a download? maybe?
    GetAllFiles: async function (req, res) {
        const response = await listFiles();
        return res.status(200).json(response);
    },
    DeleteFile: async function (req, res) {
        const key = req.params.key;
        const response = await deleteFile(key);
        if(response) {
            return res.status(200).json({message: `Deleted ${req.params.key} successfully.`});
        } else {
            return res.status(400).json({message: `Failed to delete ${req.params.key}`});
        }
    }
}

module.exports = Controller