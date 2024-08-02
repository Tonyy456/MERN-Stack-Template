import React, {useState, useEffect} from 'react';
import {useForm, Submit, FilesField} from "@/components/Form/index.jsx";
import axios from "@/utils/axios.jsx"
import uploadFile from "@/utils/uploadFiles.jsx";
import FileDisplay from "@/components/FileDisplay.jsx";

function FilesUploadForm(props) {
    const [images, setImages] = useState([]);
    const form = useForm({});

    useEffect(() => {
        getDatabase();
    },[])

    const onSubmit = async (e) => {
        e.preventDefault();
        const files = form.state.newFiles;
        if(files) {
            for(let i = 0; i < files.length; i++) {
                const response = await uploadFile(files[i]);
                if(response.status < 300) {
                    setImages(prev => [...prev, response.data.file]);
                }
            }
        }
    }

    const getDatabase = (e) => {
        axios.get("/api/file").then(res => {
            setImages(res.data);
        })
    }

    const deleteImage = (image) => {
        axios.delete(`/api/file/${image.split("/").pop()}`).then(result =>
            setImages(prev => prev.filter(a => a !== image))
        );
    }

    return (
        <div className="w-screen items-center justify-center">
            <h1 className="m-auto w-max">File Upload Test</h1>
            <form  onSubmit={onSubmit}>
                <div className="m-auto w-min">
                    <Submit />
                </div>
                <div  className="w-full mt-4 flex gap-10 items-center justify-center" >
                    <FilesField form={form} name="newFiles" label="Files To Add" />
                </div>
            </form>
            <div className="ml-20 mr-20 mt-12 border-t-4 border-t-accent m-auto w-auto">
                <h1>Images In Database: </h1>
                <button className="btn btn-primary" onClick={getDatabase}> Fetch Database</button>
                <div className="flex flex-row flex-wrap w-full items-center">
                    {images.map((image, index) =>
                        <React.Fragment key={index}>
                            <FileDisplay
                                onClick={() => {deleteImage(image)}}
                                className="w-1/3 max-w-64 h-auto"
                                key={index}
                                src={image}
                                alt={`${image.split("/").pop()}`} />
                        </React.Fragment>
                    )}
                </div>

            </div>
        </div>
    );
}

export default FilesUploadForm;