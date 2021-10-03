import React, { useState, useEffect } from 'react'
import Sidebar, { Field } from "../sidebar/sidebar";
import ItemList from "../itemList/itemList";
import Error from '../error/error';
import CetService from '../../services/server-api';

function Character(props) {
    const [state, setState] = useState([{
        charId: null,
        error: false
    }])
    const gotService = new CetService()
    // componentDidCatch() {
    //     this.setState({
    //         error: true
    //     })
    // }
    const onCharId = (id) => {
        setState({
            charId: id
        })
    }
    const { error } = state;
    if (error) {
        return <Error />
    }
    return (
        <div id="wrapper">
            <ItemList
                name={props.name}
                onCharId={onCharId}
                service={gotService.getAllCharacters}
                renderItem={(item) => `${item.name} (${item.gender})`} />
            <Sidebar
                charId={state.charId}
                service={gotService.getCharacter}
            >
                <Field field="gender" label="Gender" />
                <Field field="born" label="Born" />
                <Field field="died" label="Died" />
                <Field field="culture" label="Culture" />
            </Sidebar>
        </div>
    )
}

export default Character;