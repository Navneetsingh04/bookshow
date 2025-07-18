import React from 'react'
import style from './MovieDetails.module.scss'
import Detail from './sections/details/Details'
import Booking from './sections/booking/Booking'
import Recommendation from './sections/recommendation/Recommendation'
import { useParams } from "react-router";
const MovieDetails = () => {
  const { id } = useParams();
  return (
      <main className={style.container}>
        <Detail />
        <Booking />
        <Recommendation />
      </main>
  )
}

export default MovieDetails
