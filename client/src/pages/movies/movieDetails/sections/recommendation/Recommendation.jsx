import React from 'react'
import style from './Recommendation.module.scss'
import Button from '../../../../../components/atoms/buttons/Button'
import Card from '../../../../../components/molecules/card/Card';
import { Icon } from '@iconify/react';
import moviesData from '../../../../../data/movies.json';
import { useNavigate } from 'react-router';
const Recommendation = () => {
  const navigate = useNavigate();
  return (
    <>
    <section className={style.container}>
        <div className={style.header}>
          <h3>You May Also Like</h3>
          <p>
            <span>View All</span>
            <span>
              <Icon icon={"solar:arrow-right-linear"} />
            </span>
          </p>
        </div>
        <div className={style.moviesGrid}>
          {moviesData.slice(4).map((movie) => (
            <Card
              key={movie.id}
              {...movie}
              clickHandler={() => navigate(`movies/${movie.id}`)}
            />
          ))}
        </div>
      </section>
      <div className={style.button}>
        <Button
          className={style["showmore-btn"]}
          text="Show More"
          clickHandler={() => navigate("/movies")}
        />
      </div>
    </>
  )
}

export default Recommendation
