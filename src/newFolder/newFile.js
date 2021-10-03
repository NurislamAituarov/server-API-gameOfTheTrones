import React, { useState } from 'react'
import s from './file.module.css'

export default function NewFile() {

    const [arr, setArr] = useState([
        { name: 'banana', id: 1, chose: false, marked: false },
        { name: 'apple', id: 2, chose: false, marked: false },
        { name: 'orange', id: 3, chose: false, marked: false },
        { name: 'plum', id: 4, chose: false, marked: false }

    ])
    const [value, setValue] = useState('');
    const [index, setIndex] = useState(5);

    const onChange = (e) => {
        setValue(e.target.value)
    }
    const newAddName = (e) => {
        e.preventDefault();
        if (!value) {
            return
        }
        setIndex(index + 1)
        const newItem = {
            name: value,
            id: index,
            chose: false,
            marked: false
        }
        const newArr = [...arr, newItem]
        setValue('')
        setArr(newArr)
    }
    const onId = (id) => {
        const index = arr.findIndex(elem => elem.id === id);
        const old = arr[index];
        const newItem = { ...old, chose: !arr.chose, marked: !arr.marked };
        const newArr = [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
        console.log(newArr)
        setArr(newArr)
    }
    const addName = (arr) => {
        localStorage.setItem('Arr', arr);
        const newArr = arr.filter(elem => elem.chose);
        const showName = newArr.map(elem => {
            return (
                <li>{elem.name} <button onClick={() => onDeled(elem.id)} >&times;</button></li>
            )
        })
        return showName
    }
    const onDeled = (id) => {
        const index = arr.findIndex(elem => elem.id === id);
        const old = arr[index];
        const newItem = { ...old, chose: false, marked: false };
        const newArr = [...arr.slice(0, index), newItem, ...arr.slice(index + 1)];
        setArr(newArr)
    }
    const onDeledItem = (id) => {
        const index = arr.findIndex(elem => elem.id === id);
        const newArr = [...arr.slice(0, index), ...arr.slice(index + 1)];
        setArr(newArr)
    }
    
    const marked = arr.filter(elem => elem.marked).length;
    if(localStorage.getItem('Arr')){
        
    }
    const show = addName(arr);
    return (
        <>
            <form className={s.form} onSubmit={newAddName}>
                <h3>Добавляем продукты в список</h3>
                <input onChange={onChange} value={value} placeholder="введи названия продукта" type="text"></input>
                <button type="submit">добавить в список</button>
            </form>
            <div className={s.box}>
                <h1>Продукты:{arr.length}</h1>
                <em> В корзине: {marked}</em>
                <ul className={s.ul}>
                    <ItemList onDeledItem={onDeledItem} state={arr} onId={onId} />
                </ul>

            </div>
            <div className={s.basket}>
                <h3>Корзина</h3>
                {show}
            </div>
        </>
    )
}
/////Список
const ItemList = ({onDeledItem, state, onId}) => {
    const item = () => {
        const newItem = state.map(elem => {
            let className = ''
            if (elem.marked) {
                className = 'span'
            }
            return <li className={s.li}>
                <span className={s[className]}>{elem.name}</span>
                <div>
                    <button onClick={() => onId(elem.id)}>добавить в корзину</button>
                    <button onClick={() => onDeledItem(elem.id)}>&times;</button>
                </div>
            </li>
        })
        return newItem
    }
    const newItem = item()
    return (
        <>
            {newItem}
        </>
    )
}
