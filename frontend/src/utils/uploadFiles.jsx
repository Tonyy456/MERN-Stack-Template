import React from 'react';
import axios from '@/utils/axios.jsx'

const uploadFile = async (file) => {
    const formData = new FormData();
    formData.append(`file`, file);
    return await uploadFormData(formData);
}

const uploadFormData = async (formData) => {
    try {
        const response = await axios.post('/api/file', formData, {
            onUploadProgress: (progress) => {
                console.log(progress);
            },
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        });
        return response;
    } catch(error) {
        console.log(error);
        return undefined;
    }
}

export default uploadFile;