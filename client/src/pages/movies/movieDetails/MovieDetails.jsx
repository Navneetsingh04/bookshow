import React from 'react'
import style from './MovieDetails.module.scss'
import Detail from './sections/details/Details'
import Recommendation from './sections/recommendation/Recommendation'
const MovieDetails = () => {
  return (
      <main className={style.container}>
        <Detail />
        <Recommendation />
      </main>
  )
}

export default MovieDetails
