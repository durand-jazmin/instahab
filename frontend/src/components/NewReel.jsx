import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { sendReelService } from "../services";
import "./NewReel.css";

const NewReel = ({ addReel }) => {
  const { token } = useContext(AuthContext);
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleForm = async (e) => {
    e.preventDefault();

    try {
      if (!image) {
        throw new Error("Please select an image.");
      }

      setLoading(true);
      const data = new FormData(e.target);
      const reel = await sendReelService({ data, token });
      addReel(reel);

      e.target.reset();
      setImage(null);
      navigate("/");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form className="new-reel" onSubmit={handleForm}>
        <legend className="add-reel">Add a new reel...</legend>
        <input
          type="text"
          name="text"
          id="text"
          placeholder="Tell us about ..."
        />

        <input
          type="file"
          placeholder="File"
          name="image"
          id="image"
          accept="image/*"
          required
          onChange={(e) => setImage(e.target.files[0])}
        />
        {image ? (
          <figure>
            <img
              src={URL.createObjectURL(image)}
              style={{ width: "50px" }}
              alt="Preview"
            />
          </figure>
        ) : null}

        <button>Create new reel</button>
        {error ? <p>Error: {error}</p> : null}
        {loading ? <p>Posting new reel...</p> : null}
      </form>
    </>
  );
};

export default NewReel;
