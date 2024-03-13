import React from 'react'
import Logo from '../../assets/images/Barkwise_alliance_logo.jpg'
import style from './Home.module.css'
import {Link} from 'react-router-dom'

const Home = () => {
  return (
    <>
    <nav>
      <ul className={style.navbar}>
        <li className={style.navbar_logo}>
          <img src={Logo} className={style.navbar_logo_img}/>
          <div className={style.navbar_logo_text}>
            <p style={{margin:'0'}}>Barkwise</p>
            <p style={{margin:'0'}}>Alliance</p>
          </div>
        </li>
        <li style={{padding:'2rem',margin: '0rem 0rem 0rem 20rem'}}>DoggyPedia</li>
        <li style={{padding:'2rem'}}>MatchCan</li>
        <li style={{padding:'2rem'}}>Events</li>
        <li style={{margin: '0rem 0rem 0rem 10rem',padding:'2rem'}}>Login</li>
      </ul>
    </nav>
    <header className={style.header}>
      <section className={style.header_section}>
        <h1 style={{fontSize:'2.7rem', fontWeight:'bold'}}>Pawsitively Changing Lives, One Woof at a Time</h1>
        <p>A community for sharing the love for our best four-legged friends.</p>
        <button className={style.header_section_button}>Join Barkwise</button>
      </section>
      <section style={{display:'flex', flexDirection:'column', alignItems:'flex-start', gap:'5rem'}}>
      </section>
    </header>

    <main>
      <div style={{backgroundColor:'rgb(255, 235, 203)', padding:'5rem'}}><h2>We are a non-profit that promotes the doggy care culture.</h2></div>
      <section className={style.main_section}>
        <div style={{backgroundColor:'rgb(45, 77, 115)', width:'40rem',height:'20rem', margin:'1rem', borderRadius:'10rem 0rem 10rem 0rem'}}></div>
        <div className={style.main_section_text}>
          <h3>We share knowledge</h3>
          <p>Explore all the world existing dog breeds in the <Link to='/breeds'>'DoggyPedia'</Link>.</p>
        </div>
      </section>
      <section className={style.main_section}>
        <div className={style.main_section_text}>
          <h3>Match preferences</h3>
          <p>Discover the most appropiate breeds for your specific situation with our <Link to='/matcher'>A.I. powered 'MatchCan'</Link>. It's free!</p>
        </div>
        <div style={{backgroundColor:'rgb(45, 77, 115)', width:'40rem',height:'20rem', margin:'1rem', borderRadius:'0rem 10rem 0rem 10rem'}}></div>
      </section>
      <section className={style.main_section}>
        <div style={{backgroundColor:'rgb(45, 77, 115)', width:'40rem',height:'20rem', margin:'1rem', borderRadius:'10rem 0rem 10rem 0rem'}}></div>
        <div className={style.main_section_text}>
          <h3>and meet together!</h3>
          <p>Stay up to date with the <Link to='/events'>regular events</Link> Barkwise organizes.</p>
        </div>
      </section>
    </main>
    <footer>
      Made with love by Barkwise members.
    </footer>
    </>
  )
}

export default Home