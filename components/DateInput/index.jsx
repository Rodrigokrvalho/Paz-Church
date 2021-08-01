import React from "react";
import { TextInput } from "../TextInput"

export const DateInput = ({onChange, value, name, label}) => {
    const handleDateValidation = (v) => {
        let dateArray = v.split('/')
        if (dateArray[1] <= 12 && dateArray[2] < 2020) {
            let date = new Date(dateArray[2], dateArray[1] - 1, dateArray[0])
            return date == "Invalid Date" ? false : true
        }
        else return false
    }


    return (
        <TextInput
            onChange={onChange}
            value={value}
            name={name}
            label={label} />
    )
}
