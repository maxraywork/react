import React from 'react';

const MySelect = (props) => {
    return (
        <select value={props.value}
        onChange={event => props.onChange(event.target.value)}>
            <option value={props.defaultValue}>{props.defaultValueText}</option>
            {props.options.map((option) =>
                <option value={option.value} key={option.value}>{option.name}</option>
            )}
        </select>
    );
};

export default MySelect;