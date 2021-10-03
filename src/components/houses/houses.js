import React, { useState, useEffect } from 'react'
import CetService from '../../services/server-api';
import ItemList from '../itemList/itemList';
import Sidebar, { Field } from '../sidebar/sidebar';

export default function Houses(props) {
    const [state, setState] = useState({
        charId: null
    })
    const gotService = new CetService();

    const onCharId = (id) => {
        setState({
            charId: id
        })
    }

    return (
        <div id="wrapper">
            <ItemList
                name={props.name}
                onCharId={onCharId}
                service={gotService.getHouses}
                renderItem={(item => `${item.name} (${item.region})`)} />
            <Sidebar charId={state.charId} service={gotService.getHouse}>
                <Field field="name" label="Name" />
                <Field field="coatOfArms" label="CoatOfArms" />
                <Field field="region" label="Region" />
            </Sidebar>
        </div>
    )
}
