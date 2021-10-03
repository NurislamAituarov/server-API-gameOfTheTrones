import React, { useState, useEffect } from 'react'
import CetService from '../../services/server-api'
import ItemList from '../itemList/itemList'
import Sidebar, { Field } from '../sidebar/sidebar'

function Books(props) {
    const gotService = new CetService();
    const [state, setState] = useState({
        charId: null
    })

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
                service={gotService.getBooks}
                renderItem={(item) => `${item.name} (${item.numberOfPages})`} />
            <Sidebar charId={state.charId} service={gotService.getBook}>
                <Field field="name" label="Name" />
                <Field field="authors" label="Authors" />
                <Field field="numberOfPages" label="NumberOfPages" />
                <Field field="publisher" label="Publisher" />
            </Sidebar>
        </div>
    )
}
export default Books;