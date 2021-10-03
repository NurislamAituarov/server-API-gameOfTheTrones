import React, { Component, useState, useEffect } from 'react'
import GetService from '../../services/server-api'
import Spinner from '../spinner/spinner';
import './rendomChar.css';

const RandomChar = () => {
    const [arr, setArr] = useState([{
        name: null,
        gender: null,
        born: null,
        died: null,
        culture: null,
        loading: true
    }]);
    const getService = new GetService();

    useEffect(() => {
        updateChar();
        const timerId = setInterval(updateChar, 3000);
        return ()=>{
            clearInterval(timerId)
        }
    },[])
    const updateChar = () => {
        const id = Math.floor(Math.random() * 140 + 25);
        getService.getCharacter(id)
            .then(arr => {
                setArr(
                    {
                        name: arr.name,
                        gender: arr.gender,
                        born: arr.born,
                        died: arr.died,
                        culture: arr.culture,
                        loading: false
                    }
                )
            })
    }

    const { loading } = arr;
    const content = loading ? <Spinner /> : <View props={arr} />
    return (
        <div className="box">
            {content}
        </div>
    )
}
const View = ({ props }) => {
    const { name, gender, born, died, culture } = props;
    return (
        <>
            <h4>Random Character: {name}</h4>
            <ul>
                <li>
                    <span>Gender</span>
                    <span>{gender}</span>
                </li>
                <li>
                    <span>Born</span>
                    <span>{born}</span>
                </li>
                <li>
                    <span>Died</span>
                    <span>{died}</span>
                </li>
                <li>
                    <span>Culture</span>
                    <span>{culture}</span>
                </li>
            </ul>
        </>
    )
}
export default RandomChar;