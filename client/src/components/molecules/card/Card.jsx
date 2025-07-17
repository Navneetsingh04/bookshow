import React from 'react'
import style from "./Card.module.scss";
const Card = () => {
  return (
    <main className={style.container}>
        <article className={style.card}>
            <img src="https://via.placeholder.com/150" alt="Movie Poster" />
            <h2>Movie Title</h2>
            <p>Action | Adventure | Sci-Fi</p>
            <p>
                <span>Release Date: 2018</span>
                <span>Duration: 2h 8m</span>
            </p>
            <div className={style.description}>
                In a post-apocalyptic world where cities ride on wheels and consume each other to survive, two people meet in London and try to stop a conspiracy.
            </div>
            
        </article>
    </main>
  )
}

export default Card
