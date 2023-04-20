import React from 'react'
import { useDataLayerValue } from '../../../DataLayer'
import Header from '../Header/Header'
import './Body.css'

import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import FavoriteIcon from '@mui/icons-material/Favorite';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

import SongRow from './SongRow/SongRow';

function Body({ spotify }) {
  const [{ discover_weekly }, dispatch] = useDataLayerValue();

  const playPlaylist = (id) => {
    spotify.play({
      context_uri: `spotify:playlist:37i9dQZF1DWT8aqnwgRt92`,
    }).then((res) => {
      spotify.getMyCurrentPlayingTrack().then((r) => {
        dispatch({
          type: 'SET_ITEM',
          item: r.item,
        });
        dispatch({
          type: 'SET_PLAYING',
          playing: true,
        });
      });
    });
  };

  const playSong = (id) => {
    spotify.play({uris: [`spotify:track:${id}`]}).then((res) => {
      spotify.getMyCurrentPlayingTrack().then((r) => {
        dispatch({
          type: "SET_ITEM",
          item: r.item,
        });
        dispatch({
          type: "SET_PLAYING",
          playing: true,
        });
      });
    });
  };

  return (
    <div className='body'>
      <Header spotify={spotify} />

      <div className="body_info">
        <img src={discover_weekly?.images[0].url} alt="" />
        <div className="body_infoText">
          <strong>PLAYLIST</strong>
          <h2>Discover Weekly</h2>
          <p>{discover_weekly?.description}</p>
        </div>
      </div>

      <div className="body_songs">
        <div className="body_icons">
          <PlayCircleIcon onClick={playPlaylist} className='body_shuffle' />
          <FavoriteIcon fontSize='large' />
          <MoreHorizIcon />
        </div>

        {discover_weekly?.tracks.items.map(item => (
          <SongRow playSong={playSong} track={item.track} />
        ))}
      </div>
    </div>
  )
}

export default Body