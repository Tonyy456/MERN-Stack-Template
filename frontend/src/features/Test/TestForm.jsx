import React, {useState, useEffect} from 'react';
import Form, {
    TextField,
    Text,
    Toggle,
    Select,
    Range,
    RadioGroup,
    Block,
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
    const options = [
        {title: 'StarWars', value: 5},
        {title: 'Meet the Fockers', value: 3},
        {title: 'The Hustle', value: 9},
    ]
    const handleSubmit = (e,v) => {
        console.log(v);
    }
    const getOptionLabel = (a) => a.title;
    return (
        <div className="overflow-hidden">
            <h1 className="w-fit m-auto text-4xl mt-4"> React Test Components. </h1>
            <div className="p-4 m-auto overflow-x-scroll max-w-2xl">
                <Form onSubmit={handleSubmit} defaultValue={state}>
                    <Block>
                        <TextField name="textfield" label="Text Field"/>
                        <Text name="password" label="Text"/>
                    </Block>
                    <TagField name="tags" label="Tags" options={options} getOptionLabel={getOptionLabel} freeSolo/>
                    <Block>
                        <Select name="select" getOptionLabel={getOptionLabel} options={options} label="Select"/>
                        <RadioGroup name="radiogroup" getOptionLabel={getOptionLabel} options={options}
                                    label="Radio Group"/>
                    </Block>
                    <Block>
                        <Range name="range" label="Range"/>
                        <Block vertical fitW>
                            <Toggle name="toggle" label="Toggle"/>
                            <Checkbox name="checkbox" label="Checkbox"/>
                        </Block>
                    </Block>
                    <Block fitW>
                        <File name="file" label="File"/>
                        <Files name="files" label="Files"/>
                    </Block>
                </Form>
            </div>
        </div>
    );
}

export default TestForm;