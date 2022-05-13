import React, { useState } from 'react';

const MatchesModal = ({algo, search, matches, setMatches, setResult, setMovie, setErr}) => {

  const submit = (title) => {
    //e.preventDefault();
    //console.log(title)
    var url = 'https://qac386-backend.herokuapp.com/api/recommend-version';
    fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({'title': title, 'algo': algo})
    })
    .then(res => {return res.json()})
    .then(data => {
      setMovie(data['title'])
      setResult(data['recs'])
      setErr(false);
      setMatches(null);
      //console.log(data)
      // setTest(data)
    })//
  }

  return (
    <div className="delete-box">
      <div className="delete-content">
        <span className="close" onClick={() => setMatches(null)}>
          &times;
        </span>
        <p className='modal-text'>
          There are multiple matches for the movie title: '{search}'. Please click on the version of this movie you are interested in to see recommendations.
        </p>
        <div className='flex centered'>
          {matches.map((title) => {
            return (
              <button onClick={() => submit(title)}>
                {title}
              </button>
            )})}
        </div>
      </div>
    </div>
  );
};

export default MatchesModal;
