import React from 'react'
import style from './MovieDetails.module.scss'
import Detail from './sections/details/Details'
import Recommendation from './sections/recommendation/Recommendation'
import { useParams } from "react-router";
const MovieDetails = () => {
  const { id } = useParams();
  return (
      <main className={style.container}>
        <Detail />
        <Recommendation />
      </main>
  )
}

export default MovieDetails
