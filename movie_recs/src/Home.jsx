import React, { useState, useEffect } from 'react';
import Searchbar from './Searchbar';
import Movie from './Movie'
import movie_img from './movie_img.png'

const Home = () => {
  //console.log('im here')
  const [algo, setAlgo] = useState(0); // 0 is DM, 1 is DBOW
  const [movie, setMovie] = useState(null);
  const [recs, setRecs] = useState(null);
  const [dne, showDne] = useState(false);

  //console.log(recs)
  //console.log('helloooo')
  return (
    <div className='movie'>
      <h1 id='pageTitle'>Movie Recommender</h1>
      <div className='flex centered img-wrapper'>
        <img src={movie_img} id='movie-img' alt='popcorn, a roll of film, and a movie theater drink' />
      </div>
      <Searchbar algo={algo} setAlgo={setAlgo} setResult={setRecs} setMovie={setMovie} setErr={showDne} />
      {dne && movie && <h2>Sorry, '{movie}' is not in our database.</h2>}
      {!dne && movie && <h2>Recommendations for '{movie}'</h2>}
      {!dne && recs && (
        recs.map(({ title, score, summary, cast, genre, director }, index) => {
          return (
            <Movie
              title={title}
              score={score}
              summary={summary}
              cast={cast}
              genre={genre}
              director={director}
              rank={index+1}
              searchMovie={movie}
            />
          )
        })
      )}
    </div>
  )
}

export default Home;
