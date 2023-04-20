import React, { useEffect, useState } from 'react';
import './App.css';

import Login from './components/authentication/Login';
import Player from './components/Player/Player';

import { getTokenFromUrl } from './spotify';

/* npm i spotify-web-api-js */
import SpotifyWebApi from 'spotify-web-api-js';

import { useDataLayerValue } from './DataLayer';


const spotify = new SpotifyWebApi();


function App() {
  /* this is for get the items that has been dispatched 
  into datalayer */
  const [{ token }, dispatch] = useDataLayerValue();

  /* Run code based on a given condition */
  /* When the App component rerendered, then it will render
  the component inside [...] (useEffect(()=>{},[])) instead */
  useEffect(() => {
    const hash = getTokenFromUrl();
    window.location.hash = ''; /* remove url from browser for security (its also very clean too) */

    const _token = hash.access_token;

    if (_token) {
      /* Connect React with spotify web api to use spotify api */
      spotify.setAccessToken(_token);

      dispatch({
        type: 'SET_TOKEN',
        token: _token,
      });

      dispatch({
        type: "SET_SPOTIFY",
        spotify: spotify,
      });

      /* Get the current user from spotify. If gotten, push it to
      the datalayer so that we can easily adapt it in any components*/
      spotify.getMe().then((user) => {
        dispatch({
          type: 'SET_USER',
          user: user,
        });
      });

      spotify.getUserPlaylists().then((playlists) => {
        dispatch({
          type: 'SET_PLAYLISTS',
          playlists: playlists,
        });
      });

      spotify.getPlaylist('37i9dQZF1DWT8aqnwgRt92').then((response) => {
        dispatch({
          type: 'SET_DISCOVER_WEEKLY',
          discover_weekly: response,
        });
      });
    }
  }, []);

  return (
    <div className="app">
      {token ? <Player spotify={spotify} /> : <Login />}
    </div>
  )
}

export default App;
