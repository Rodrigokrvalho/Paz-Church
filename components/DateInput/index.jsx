import React from "react";
import { TextInput } from "../TextInput"

export const DateInput = ({onChange, value, name, label}) => {
    
    return (
        <TextInput
            onChange={onChange}
            value={value}
            name={name}
            label={label} />
    )
}
