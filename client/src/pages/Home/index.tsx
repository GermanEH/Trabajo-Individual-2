import React from 'react'
import NavBar from '../../modules/core/components/NavBar'
import style from '@/assets/styles/Home.module.css'
import {Link} from 'react-router-dom'
import HeroImage from '@/assets/images/Hero_image_2.jpeg'

const Home:React.FC = () => {
  return (
    <>
    <header className={style.header}>
      <section className={style.header_section}>
        <h1 style={{fontSize:'2.7rem', fontWeight:'bold'}}>Pawsitively Changing Lives, One Woof at a Time</h1>
        <p>A community for sharing the love for our best four-legged friends.</p>
        <button className={style.header_section_button}>BECOME MEMBER</button>
      </section>
      <section style={{display:'flex', flexDirection:'column', alignItems:'center', gap:'5rem'}}>
        <img src={HeroImage} style={{width:'50vw', height:'auto', borderRadius:'5rem 0rem 0rem 5rem', margin:'2rem 0rem 0rem 10rem'}}/>
      </section>
    </header>

    <main>
      <div style={{
        // backgroundColor:'#f4ede4', 
        backgroundColor:'rgb(255, 235, 203)', 
        padding:'5rem', textAlign:'center'}}><h2>We are a non-profit that promotes the doggy care culture.</h2></div>
      <section className={style.main_section}>
        <div style={{backgroundColor:'rgb(45, 77, 115)', width:'40rem',height:'20rem', margin:'1rem', borderRadius:'10rem 0rem 10rem 0rem'}}></div>
        <div className={style.main_section_text}>
          <h3>We share knowledge</h3>
          <p>Explore all the world existing dog breeds in the <Link to='/breeds' className={style.main_section_link}>'DoggyPedia'</Link>.</p>
        </div>
      </section>
      <section className={style.main_section}>
        <div className={style.main_section_text}>
          <h3>Match preferences</h3>
          <p>Discover the most appropiate breeds for your specific situation with our <Link to='/matcher' className={style.main_section_link}>A.I. powered 'MatchCan'</Link>. It's free!</p>
        </div>
        <div style={{backgroundColor:'rgb(45, 77, 115)', width:'40rem',height:'20rem', margin:'1rem', borderRadius:'0rem 10rem 0rem 10rem'}}></div>
      </section>
      <section className={style.main_section}>
        <div style={{backgroundColor:'rgb(45, 77, 115)', width:'40rem',height:'20rem', margin:'1rem', borderRadius:'10rem 0rem 10rem 0rem'}}></div>
        <div className={style.main_section_text}>
          <h3>and meet together!</h3>
          <p>Stay up to date with the <Link to='/events' className={style.main_section_link}>regular events</Link> Barkwise organizes.</p>
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