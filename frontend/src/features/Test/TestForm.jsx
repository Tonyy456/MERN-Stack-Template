import React, {useState, useEffect} from 'react';
import Form, {
    TextField,
    Text,
    Toggle,
    Select,
    Range,
    RadioGroup,
    File,
    Checkbox,
    Files,
    TagField
} from '@/components/Form'

const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
function TestForm(props) {
    const [state, setState] = useState({})
    const populateFieldsAsync = async () => {
        await sleepNow(1000);
        setState({
            textfield: 'Default Text',
            text: 'Default Text',
            toggle: true,
            select: 'Option 1',
            range: 50,
            radiogroup: 'Option 1',
            file: null,
            checkbox: false
        });
    }
    useEffect(() => {
        populateFieldsAsync();
    }, []);
    const options = ['Option 1', 'Option 2', 'Option 3']
    const handleSubmit = (e,v) => {
        console.log(v);
    }
    return (
        <div className="p-4 m-4 overflow-x-scroll border">
            <Form onSubmit={handleSubmit} defaultValue={state}>
                <Toggle name="toggle" label="Toggle"/>
                <Checkbox name="checkbox" label="Checkbox"/>
                <TextField name="textfield" label="Text Field"/>
                <Text name="password" label="Text"/>
                <TagField name="tags" options={options} label="Tags"/>
                <Select name="select" options={options} label="Select"/>
                <Range name="range" label="Range"/>
                <RadioGroup name="radiogroup" options={options}  label="Radio Group"/>
                <File name="file" label="File"/>
                <Files name="files" label="Files"/>
            </Form>
        </div>
    );
}

export default TestForm;