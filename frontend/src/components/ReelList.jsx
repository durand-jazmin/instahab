import React,{useContext,useState,useEffect} from 'react';
import Reel from './Reel';
import './ReelList.css';
import { AuthContext } from '../context/AuthContext';
import LikesComponent from './LikesComponent';

const ReelList = ({ reels, removeReel }) => {
  console.log(reels);
  return reels.length ? (
    <ul className='reel-list'>

      {reels.map((reel) => (
        <li key={reel.id} className='reel-item'>
          <Reel  reel={reel} removeReel={removeReel} />
        </li>
      ))}
    </ul>
  ) : (
    <p className="no-reels">There are no reels...</p>
  );
};

export default ReelList;