import React, { Component, useState, useEffect } from 'react'
import Spinner from '../spinner/spinner';
import s from './itemList.module.css'
import CetService from '../../services/server-api';

const ItemList = ({ service, name, onCharId, renderItem }) => {

    const [itemList, updateList] = useState(null);

    useEffect(() => {
        service()
            .then((arr) => {
                updateList(arr)
            })
    }, [])

    const renderItems = (arr) => {
        return arr.map((item, i) => {
            let index = +item.url.match(/\d/g).join('');
            // console.log(item.url.match(/\d/g).join(''))
            const all = renderItem(item);
            return (
                <li
                    className={s.li}
                    id={i}
                    onClick={() => onCharId(index)}
                >
                    {all}
                </li>
            )
        })
    }
    if (!itemList) {
        return <Spinner />
    }
    const item = renderItems(itemList)
    return (
        <div className={s.itemList}>
            <div className={s.itemName}>
                <h2 className={s.h2}>List item</h2>
                <p><a href="#">{name}</a></p>
            </div>
            <ul>
                {item}
            </ul>
        </div>
    )
}
export default ItemList

// const withData = (View, getData) => {
//     return class extends Component {
//         state = {
//             data: null
//         }
//         componentDidMount() {
//             getData()
//                 .then((arr) => {
//                     console.log(arr)
//                     this.setState({
//                         data: arr
//                     })
//                 })
//         }
//         render() {
//             const { data } = this.state;
//             if (!data) {
//                 return <Spinner />
//             }
//             return <View {...this.props} data={data} />
//         }
//     }
// }
// const { getAllCharacters } = new CetService();
// export default withData(ItemList, getAllCharacters)