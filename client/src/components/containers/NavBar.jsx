import React from 'react';
import { Link } from 'react-router-dom';
import style from '../../assets/styles/NavBar.module.css'
import SearchBar from './SearchBar.jsx';

export default function NavBar({onSearch}) {            //y esto?
    return (
        <nav className={style.nav_bar}>
            <Link to ='/home' className={style.nav_bar_item}>Home</Link>
            <Link to ='/dog/create' className={style.nav_bar_item}>Create New Breed!</Link>
            <Link to ='/dogKennel' className={style.nav_bar_item}>Adoption</Link>
            <SearchBar />
        </nav>
    )
}