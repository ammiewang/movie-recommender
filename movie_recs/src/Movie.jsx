import React, { useState, useEffect } from 'react';
import './App.css'

const Movie = ({title, score, summary, cast, genre, director, rank, searchMovie}) => {
  const [more, setMore] = useState(false);
  useEffect(() => {
    setMore(false)
  }, [searchMovie]);
  //console.log('im here')
  // const [algo, setAlgo] = useState(0); // 0 is DM, 1 is DBOW
  // const [movie, setMovie] = useState(null);
  // const [recs, setRecs] = useState(null);
  //console.log('helloooo')
  return (
    <div>
      <div className='flex'>
        <button className='expand-button' onClick={() => setMore(!more)}>
          {more ? '-' : '+'}
        </button>
        <span className='movie-title'>{rank + '. ' + title}</span>
      </div>
      {more && (
        <div>
          <div className='movie-data'><span className='bold'>Similarity Score:</span> {score}</div>
          <div className='movie-data'><span className='bold'>Summary:</span> {summary}</div>
          <div className='movie-data'><span className='bold'>Genre(s):</span> {genre ? genre : 'unknown'}</div>
          <div className='movie-data'><span className='bold'>Director:</span> {director ? director : 'unknown'}</div>
          <div className='movie-data'><span className='bold'>Cast:</span> {cast ? cast : 'unknown'}</div>
        </div>
      )}
    </div>
  )
}

export default Movie;
