import React from 'react';
import {
    Submit,
    TextAreaField,
    TextField,
    ToggleField,
    TagField,
    SelectField,
    RangeField,
    RadioGroupField,
    FilesField,
    FileField,
    CheckboxField,
    DateField,
    useForm
} from '@/components/Form'

const options = [
    {title: 'StarWars', value: 5},
    {title: 'Meet the Fockers', value: 3},
    {title: 'The Hustle', value: 9},
]

const sleepNow = (delay) => new Promise((resolve) => setTimeout(resolve, delay))
function TestForm(props) {
    const form = useForm({
        textfield: 'Default TextField',
        textareafield: 'Default TextField',
        togglefield: true,
        selectfield: options[0],
        rangefield: 0,
        radiogroupfield: options[0],
        filesfield: [],
        filefield: false,
        checkboxfield: false,
        datefieldtime: new Date(),
        datefieldday: new Date(),
        datefieldweek: new Date(),
        datefieldmonth: new Date(),
    });
    const getOptionLabel = (a) => a.title;

    const populateFieldsAsync = async () => {
        // await sleepNow(2000);
        form.setState({
            textfield: 'TESTING',
            textareafield: 'TESTING',
            togglefield: false,
            selectfield: options[1],
            rangefield: 50,
            radiogroupfield: options[1],
            filesfield: [],
            filefield: null,
            checkboxfield: false,
            datefieldtime: new Date(),
            datefieldday: new Date(),
            datefieldweek: new Date(),
            datefieldmonth: new Date(),
        });
    }

    const onSubmit = (e,v) => {
        e.preventDefault();
        console.log(form.state);
    }

    let copy = {...form.state}
    copy.filefield = copy.filefield?.name
    copy.filesfield = copy.filesfield?.map(item => item.name)

    return (
        <React.Fragment>
            <button className="btn btn-primary ml-44" onClick={(e) => populateFieldsAsync()}> Populate Fields with data </button>
            <div className="flex flex-row">
                <div className="overflow-hidden w-1/2">
                    <h1 className="w-fit m-auto text-4xl mt-4"> React Test Components. </h1>
                    <div className="p-4 m-auto overflow-x-scroll max-w-2xl">
                        <form onSubmit={onSubmit}>
                            <TextField
                                form={form} label="TextField" name="textfield"
                            />
                            <TextAreaField
                                form={form} label="TextAreaField" name="textareafield"
                            />
                            <ToggleField
                                form={form} label="ToggleField" name="togglefield"
                            />
                            <RangeField
                                form={form} label="RangeField" name="rangefield"
                                min={-50} max={50}
                            /> <br/>
                            <CheckboxField
                                form={form} label="Checkbox" name="checkboxfield"
                            /> <br/>

                            <SelectField
                                form={form} label="Select Field" name="selectfield"
                                options={options} getOptionLabel={getOptionLabel}
                            /> <br/>
                            <TagField
                                form={form} label="Tag Field" name="tagfield"
                                options={options} getOptionLabel={getOptionLabel} freeSolo
                            /> <br/>
                            <RadioGroupField
                                form={form} label="Radio Group" name="radiogroupfield"
                                options={options} getOptionLabel={getOptionLabel}
                            /> <br/>
                            <FilesField
                                form={form} label="Files" name="filesfield"
                            /> <br/>
                            <FileField
                                form={form} label="File" name="filefield"
                            /> <br/>
                            <DateField
                                form={form} label="Date Field" name="datefieldtime" length={0}
                            /> <br/>
                            <DateField
                                form={form} label="Date Field" name="datefieldday" length={1}
                            /> <br/>
                            <DateField
                                form={form} label="Date Field" name="datefieldweek" length={2}
                            /> <br/>
                            <DateField
                                form={form} label="Date Field" name="datefieldmonth" length={3}
                            /> <br/>
                            <Submit/>
                        </form>
                    </div>
                </div>
                <div className="w-1/2">
                      <pre>
                        <code>{JSON.stringify(copy, null, 2)}</code>
                      </pre>
                </div>
            </div>
        </React.Fragment>
    );
}

export default TestForm;