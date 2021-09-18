import React, { useState, useEffect } from 'react';
import s from './charDetails.module.css';

const CharDetails = () => {

    const [state, setState] = useState({
        arr: [
            { name: 'aaa', id: 1, marked: false, liked: false },
            { name: 'bbb', id: 2, marked: false, liked: false },
            { name: 'ccc', id: 3, marked: false, liked: false },
            { name: 'ddd', id: 4, marked: false, liked: false }
        ],
        spinner: true,
        error: false,
    }
    );
    const [text, setText] = useState('');
    const [filter, setFilter] = useState('all')
    const [index, setIndex] = useState(5)

    const onMarked = (id) => {
        setState(({ arr }) => {
            const index = arr.findIndex((elem) => elem.id === id);
            const item = arr[index];
            const newItem = { ...item, marked: !item.marked };
            const newArr = [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
            return {
                arr: newArr
            }
        })
    }
    const onDelete = (id) => {
        setState(({ arr }) => {
            const index = arr.findIndex(item => item.id === id);
            const newArr = [...arr.slice(0, index), ...arr.slice(index + 1)]

            return {
                arr: newArr
            }
        })
    }
    const onSearch = (body) => {
        setText(body)
    }
    const searchName = (elements, text) => {
        if (text.length === 0) {
            return elements
        }
        return elements.filter(elem => elem.name.includes(text))
    }
    const filterLike = (elements, filter) => {
        if (filter === 'all') {
            return elements;
        } else if (filter === 'like') {
            return elements.filter(elem => elem.marked)
        }

    }
    const onFilter = (filter) => {
        setFilter(filter)
    }
    const onAdd = (body) => {
        setIndex(index+1)
        const newItem = {
            name: body,
            id: index,
            marked: false,
            liked: false
        }
        setState(({ arr }) => {
            const newArr = [...arr, newItem];
            return {
                arr: newArr
            }
        })
    }

    const allElements = filterLike(searchName(state.arr, text), filter)
    return (
        <div className={s.section}>
            <Search
                onFilter={onFilter}
                onSearch={onSearch}
                arr={state}
            />
            <div className={s.charDetails}>
                <Content
                    arr={allElements}
                    onDelete={onDelete}
                    // onLiked={onLiked}
                    onMarked={onMarked}
                />
            </div>
            <AddName onAdd={onAdd} />
        </div>
    )
}


////////добавление ///////////
const AddName = (props) => {
    const [value, setValue] = useState('')

    const onChange = (e) => {
        setValue(e.target.value)
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if (value !== '') {
            props.onAdd(value);
            setValue('')
        }
    }
    return (
        <form onSubmit={onSubmit} className={s.addName}>
            <input
                placeholder="добавить название"
                onChange={onChange}
                value={value}
                type="text" />
            <button type="submit">добавить</button>
        </form>
    )
}
//////поиск по названию///////
const Search = (props) => {
    const [value, setValue] = useState('');
    const [state, setState] = useState({
        filterAll: 'all',
        filterLike: 'like'
    })

    const onChange = (e) => {
        setValue(e.target.value)
        props.onSearch(e.target.value)
    }

    const { arr } = props.arr;
    const liked = arr.filter(item => item.marked).length;
    return (
        <>
            <div className={s.flex}>
                <h1>{arr.length} книг выбраны, из них понравилось {liked}</h1>
                <div>
                    <button onClick={() => props.onFilter(state.filterAll)}>все</button>
                    <button onClick={() => props.onFilter(state.filterLike)}>нравится</button>
                </div>
            </div>
            <input
                onChange={onChange}
                value={value}
                placeholder="Поиск по названию"
                className={s.inp} type="text" />
        </>
    )
}
////// Контент рендеринг////////
const Content = (props) => {
    const arr = props.arr.map((item) => {
        return (
            <li>
                <ItemContent
                    item={item}
                    marked={item.marked}
                    onLiked={() => props.onMarked(item.id)}
                    onDelete={() => props.onDelete(item.id)}
                />
            </li>
        )
    });
    return (
        <ul>
            {arr}
        </ul>
    )
}
const ItemContent = ({ item, marked, onDelete, onLiked }) => {
    let style = 'style'
    if (marked) {
        style = 'newLi'
    }
    return (
        <>
            <strong className={s[style]}>{item.name}</strong>
            <div>
                <button className={s.btn} onClick={onLiked}>like</button>
                <button className={s.btn} onClick={onDelete}>&times;</button>
            </div>
        </>

    )
}
export default CharDetails;



