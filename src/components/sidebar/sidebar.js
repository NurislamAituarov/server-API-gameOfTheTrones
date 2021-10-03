import React, { useState, useEffect } from 'react'
import s from './sidebar.module.css'
import CetService from '../../services/server-api'

const Field = ({ char, field, label }) => {
    // console.log(char)
    return (
        <>
            <li>{label}: <span>{char[field]}</span></li>
        </>
    )
}
export { Field }

const Sidebar = ({ charId, service, children }) => {
    let [char, setChar] = useState(null)

    useEffect(() => {
        if (!charId) {
            return
        }
        service(charId)
            .then(arr => {
                setChar(arr)
            })
    },[charId])

    if (!char) {
        return <span className={s.please}>Please select a item</span>
    }
    const { name } = char;
    return (
        <div className={s.sidebar}>
            <h2 className={s.h2}>{name}</h2>
            <ul>
                {
                    React.Children.map(children, (child) => {
                        // console.log(child)
                        // console.log(children)
                        return React.cloneElement(child, { char })
                    })
                }
            </ul>
        </div>
    )
}

export default Sidebar;

