import React from 'react';

function SelectSort(props) {
    return (
        <select
            value={props.value}
            onChange={event => props.onChange(event.target.value)}
        >
            <option disabled value="">{props.defaultValue} </option>
            { props.options.map( option =>
                <option key={option.value} value={option.value}>
                    {option.name}
                </option>
            )}
        </select>
    );
}

export default SelectSort;

