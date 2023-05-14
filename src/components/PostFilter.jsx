import React from 'react';
import MyInput from "./UI/inputs/MyInput";
import SelectSort from "./UI/selects/SelectSort";
import MyInputOld from "./UI/inputs/MyInputOld";

function PostFilter(props) {


    return (
        <div>
            <MyInputOld
                placeholder="Поиск по пользователю.."
                value={props.filter.search}
                onChange={event => props.setFilter( {...props.filter, search: event.target.value})}
            />

            <SelectSort
                value={props.filter.sort}
                onChange={selectedSort => props.setFilter({...props.filter, sort: selectedSort})}
                defaultValue={"Выбери тип сортировки"}
                options={[
                    {value: 'email', name: 'по эмейлу'},
                    {value: 'body', name: 'по контенту'}
                ]}
            />
        </div>
    );
}

export default PostFilter;