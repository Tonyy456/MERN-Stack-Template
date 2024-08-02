const { S3Client, GetObjectCommand, DeleteObjectCommand, ListObjectsCommand } = require('@aws-sdk/client-s3');
const multer = require('multer')
const multerS3 = require('multer-s3')
const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
require('dotenv').config();

// DOCUMENTATION = https://www.npmjs.com/package/@aws-sdk/client-s3
const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_BUCKET_ACCESS_KEY,
        secretAccessKey: process.env.AWS_BUCKET_SECRET_ACCESS_KEY
    },
    region: process.env.AWS_BUCKET_REGION
})

const payloadSize = 1; // number of files to upload per payload
const uploadFiles = (name, publicRead = true, numFiles = payloadSize) => {
    return multer({
        storage: multerS3({
            s3: s3,
            bucket: process.env.AWS_BUCKET_NAME,
            contentType: multerS3.AUTO_CONTENT_TYPE,
            metadata: function (req, file, cb) {
                cb(null, {}); // set metadata property on images stored in aws.
            },
            key: function (req, file, cb) {
                cb(null, `${Date.now().toString()}_${file.originalname}`) //SET Filename!
            },
            acl: publicRead ? 'public-read' : 'private'
        })
    }).array(name, numFiles)
}
const uploadPublic = uploadFiles('fileUpload', true);
const uploadPrivate = uploadFiles('fileUpload', false);

const getFileURL = async (key) => {
    const command = new GetObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
    });
    return await s3.send(command);
}
const getPrivateFileURL = async (key, expireIn = 3600) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
    };
    const command = new GetObjectCommand(params)
    return await getSignedUrl(s3, command, { expiresIn: expireIn });
}
const deleteFile = async (key) => {
    const params = {
        Bucket: process.env.AWS_BUCKET_NAME,
        Key: key,
    };
    try {
        return await s3.send(new DeleteObjectCommand(params));
    } catch (error) {
        console.error('Error deleting object:', error);
    }
}
const listFiles = async () => {
    const params = { Bucket: process.env.AWS_BUCKET_NAME };
    const response =  await s3.send(new ListObjectsCommand(params));
    const content = response.Contents || [];
    return content.map(item => `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/` + item.Key);
}

// TODO: REMOVE METHOD.. only use methods with 'key'
const deleteFileByURL = async (item) => {
    if (item)
        return await deleteFile(item.split('/').pop());
};

module.exports = {
    s3,
    uploadPublic,
    uploadPrivate,
    uploadFiles,
    getFileURL,
    getPrivateFileURL,
    deleteFileByURL,
    deleteFile,
    listFiles
};