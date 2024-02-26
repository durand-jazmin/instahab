import { useContext, useState } from 'react';
import { AuthContext } from '../context/AuthContext';
import { sendReelService } from '../services'; 
import './NewReel.css';

const NewReel = ({ addReel }) => {
  const { token } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      const data = new FormData(e.target);
      const reel = await sendReelService({ data, token }); 
      addReel(reel); 

      e.target.reset();
      setImage(null);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>📸 New reel</h1>
      <form className="new-reel" onSubmit={handleForm}>
        <fieldset>
          <label htmlFor="text">Text</label>
          <input type="text" name="text" id="text" required />
        </fieldset>
        <fieldset>
          <label htmlFor="image">Image</label>
          <input
            type="file"
            name="image"
            id="image"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />
          {image ? (
            <figure>
              <img
                src={URL.createObjectURL(image)}
                style={{ width: '50px' }}
                alt="Preview"
              />
            </figure>
          ) : null}
        </fieldset>
        <button>Create reel</button>
        {error ? <p>{error}</p> : null}
        {loading ? <p>Posting reel...</p> : null}
      </form>
    </>
  );
};

export default NewReel;