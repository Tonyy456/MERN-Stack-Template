import React, {useEffect} from 'react';
import dayjs from 'dayjs';
import weekOfYear from "dayjs/plugin/weekOfYear";
dayjs.extend(weekOfYear);

const lengthMap = ['datetime-local','date','week','month']

function getDateValue(type,form, name) {
    const dateToUse = dayjs(form.state[name] || new Date());
    switch (type) { // change to true
        case ("datetime-local"):
            return dateToUse.format('YYYY-MM-DDThh:mm:ss')
        case ("week"):
            return dateToUse.isValid() ?
                (dateToUse.format('YYYY-W') + dateToUse.week())
                : form.state[name];
        case ("date"):
            return dateToUse.format('YYYY-MM-DD');
        case ("month"):
            return dateToUse.format('YYYY-MM')
    }
}

function DateField(props) {
    const {form, name, label, length = 1} = props;
    if(!form || !name) return <p className="text-red-600"> Text field missing props. </p>
    const type = lengthMap[length];
    const value = getDateValue(type, form, name);

    // Handle change and alert form.
    const handleChange = (e) => {
        form.onChange({
            name: name,
            value: e.target.value
        })
    }

    // Render input form.
    return (
        <div className="form-control m-0">
            <label className="label cursor-pointer justify-start w-max">
                <span className="label-text mr-2 text-lg font-medium">{label}</span>
                <input
                    onChange={handleChange}
                    type={type}
                    className="border-primary border-2"
                    value={value}
                />
            </label>
        </div>
    );
}

export default DateField;