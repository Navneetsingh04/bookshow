import React, { useState } from "react";
import ReactPlayer from "react-player";
import { Icon } from "@iconify/react";

import trailers from "../../../../data/trailers.json";
import style from "./Trailer.module.scss";

const Trailer = () => {
  const [currentSrc, setCurrentSrc] = useState(trailers[0].src);

  return (
    <section className={style.container}>
      <header>
        <h2>Trailers</h2>
      </header>
      <div className={style.trailers}>
        {/* Player */}
        <ReactPlayer 
          src={currentSrc} 
          className={style.videoPlayer}
          config={{
            youtube: {
              playerVars: {
                quality: 'hd1080',
                hd: 1,
                vq: 'hd1080',
              }
            }
          }}
        />
        {/* Content Menu */}
        <ul>
          {trailers.map((trailer) => {
            return (
              <li key={trailer.id} onClick={() => setCurrentSrc(trailer.src)}>
                <img src={trailer.image} alt={trailer.alt} width={150} />
                <Icon icon={"icon-park-twotone:play"} />
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
};

export default Trailer;
