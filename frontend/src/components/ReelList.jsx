import Reel from './Reel';
import './ReelList.css';

const ReelList = ({ reels, removeReel }) => {
  return reels.length ? (
    <ul className='reel-list'>
      {reels.map((reel) => (
        <li key={reel.id}>
          <Reel reel={reel} removeReel={removeReel} />
        </li>
      ))}
    </ul>
  ) : (
    <p>There are no reels...</p>
  );
};

export default ReelList;