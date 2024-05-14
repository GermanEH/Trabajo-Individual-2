import React from 'react';
import {useLocation} from 'react-router';
import style from '@/assets/styles/Home.module.css'
import {Link} from 'react-router-dom'
import Logo from '@/assets/images/Barkwise_alliance_logo.jpg'
import SearchBar from '../../doggypedia/components/SearchBar'

export default function NavBar() {            //y esto?
    const location = useLocation()

    return (
        <nav>
      <ul className={style.navbar}>
          <Link to='/home' className={style.navbar_link}>          
        <li className={style.navbar_logo}>
            <img src={Logo} className={style.navbar_logo_img}/>
            <div className={style.navbar_logo_text}>
              <p style={{margin:'0'}}>Barkwise</p>
              <p style={{margin:'0'}}>Alliance</p>
            </div>
        </li>
          </Link>
        <li style={{padding:'2rem'}}><Link to='/breeds' className={style.navbar_link}>DoggyPedia</Link></li>
        <li style={{padding:'2rem'}}><Link to='/matcher' className={style.navbar_link}>MatchCan</Link></li>
        <li style={{padding:'2rem'}}><Link to='/events' className={style.navbar_link}>Events</Link></li>
        {location.pathname !== '/home' ? 
            <li>
                <SearchBar />
            </li> : 
            <>
            <li style={{padding:'2rem', margin: '0rem 0rem 0rem 9rem'}}>Iniciar sesión</li>
            <li>
                <button style={{width:'10rem', height:'3rem', backgroundColor:'white', color:'rgb(45, 77, 115)', borderColor:'rgb(45, 77, 115)', borderRadius:'0.2rem', fontWeight:'bold'}}>BECOME DONOR</button>
            </li>
            <li>
                <button style={{width:'10rem', height:'3rem', margin: '0rem 0rem 0rem 2rem', backgroundColor:'rgb(45, 77, 115)', color:'white', border:'none', borderRadius:'0.2rem', fontWeight:'bold'}}>BECOME MEMBER</button>
            </li>
            </>       
        }


      </ul>
        </nav>
    )
}