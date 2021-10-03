import React, { useState, useEffect } from 'react'
import Spinner from '../spinner/spinner';
import s from './weather.module.css';
import Error from '../error/error';

const Weather = () => {
    const [state, setState] = useState([{
        city: null,
        temp: null,
        country: null,
        loading: false,
        value: null,
        error: false
    }])
    useEffect(() => {
        weather()
    },[])
    const weather = () => {
        fetch(`http://api.openweathermap.org/data/2.5/forecast?q=${state.value}&appid=27fea4477bdb8c2af91b743f1f6cc1ff`)
            .then(data => data.json())
            .then(arr => {
                setState({
                    city: arr.city.name,
                    temp: Math.floor(arr.list[0].main.temp - 273),
                    country: arr.city.country,
                    loading: false,
                })
            })
            .catch(() => {
                setState({
                    error: true,
                    loading: false
                })
            })
    }
    const onChange = (e) => {
        setState({
            value: e.target.value
        })
    }
    const onClick = (e) => {
        e.preventDefault()
        if (!state.value) {
            return
        }
        weather();
        setState({
            value: '',
            loading: true,
            error: false
        })
    }

    const { loading, error } = state;
    const content = loading ? <Spinner /> : <Content props={state} />
    const errorContent = error ? <Error /> : content;
    return (
        <form onSubmit={onClick} className={s.wrapper}>
            <input
                value={state.value}
                onChange={onChange}
                placeholder="Введи город"
                className={s.inp} type="text"
            />
            <button type="submit" className={s.btn}>узнать погоду</button><br />
            {errorContent}
        </form>
    )
}
const Content = (props) => {
    const { city, country, temp } = props.props
    return (
        <>
            <strong className={s.text}>Погода в городе: <p>{city}</p></strong>
            <span className={s.text}>Tемпература: <p>{temp} &deg;</p></span>
            <span className={s.text}>Страна: <p>{country}</p></span>
        </>
    )
}
export default Weather;