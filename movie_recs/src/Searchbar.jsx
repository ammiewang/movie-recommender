import React, { useState, useEffect } from 'react';
import MatchesModal from './MatchesModal'

const Searchbar = ({algo, setAlgo, setResult, setMovie, setErr}) => {
  const algoMap = {0: 'DM', 1: 'DBOW'}
  const [search, setSearch] = useState(null);
  const [matches, setMatches] = useState(null);
  const [showAlgos, setShowAlgos] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowAlgos(false);
    var url = 'https://qac386-backend.herokuapp.com/api/recommend';
    fetch(url, {
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({'title': search, 'algo': algo})
    })
    .then(res => {return res.json()})
    .then(data => {
      var num_matches = data['num_matches'];
      if (num_matches === 0) {
        setMovie(search)
        setMatches(null)
        setErr(true)
      } else if (num_matches === 1) {
        setResult(data['recs'])
        setMovie(data['title'])
        setErr(false)
        setMatches(null)
      } else {
        setMatches(data['matches'])
      }

      //console.log(data)
      // setTest(data)
    })//
  }

  return (
    <div>
      <div className='flex searchbar'>
        <div class="dropdown">
          <button onClick={() => setShowAlgos(!showAlgos)} class="dropbtn">
            {(showAlgos ? '▼ ' : '▶ ') + algoMap[algo]}
          </button>
          {showAlgos && (
            <div id="myDropdown" class="dropdown-content">
             <p onClick={() => {setAlgo(0); setShowAlgos(false);}}>DM</p>
             <p onClick={() => {setAlgo(1); setShowAlgos(false);}}>DBOW</p>
            </div>
          )}
        </div>
        <form className="flex" id='search-box-btn' onSubmit={handleSubmit}>
          <input
            type="text"
            id="search-box"
            onChange={e => setSearch(e.target.value)}
          />
          <button type="submit" id="recommend-btn">
            Recommend
          </button>
        </form>
      </div>
      {matches && <MatchesModal algo={algo} search={search} matches={matches} setMatches={setMatches} setResult={setResult} setMovie={setMovie} setErr={setErr}/>}
    </div>
  )

}

export default Searchbar;
