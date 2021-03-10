import { css } from '@emotion/react';
/** @jsxImportSource @emotion/react */
import { useEffect, useState } from 'react';

const picture = css`
  display: flex;
  width: 150px;
  height: 400px;
`;

export default function App() {
  const [imageKey, setImageKey] = useState('noidea');
  const [userTopText, setUserTopText] = useState('');
  const [userBottomText, setUserBottomText] = useState('');
  const [arrMemeId, setArrMemeId] = useState([]);
  const address = `https://api.memegen.link/images/${imageKey}/${userTopText}/${userBottomText}`;

  // parse the URL and get the memes (=>id)
  useEffect(() => {
    fetch('https://api.memegen.link/templates')
      .then((response) => response.json())
      .then((memeArr) => {
        const responseArrMemeId = memeArr.map((meme) => {
          return meme.id;
        });
        setArrMemeId(responseArrMemeId);
      });
  }, []);

  // download the meme together with the text in a jpg file
  function handleDownloadClick() {
    fetch(address).then((response) => {
      response.arrayBuffer().then((buffer) => {
        const element = document.createElement('a');
        const file = new Blob([buffer], { type: 'image/jpeg' });
        element.href = URL.createObjectURL(file);
        element.download = 'image.jpg';
        element.click();
      });
    });
  }
  return (
    <section>
      <div>
        <h1>Meme Generator App</h1>
        <p>Enter your top sentence:</p>
        <input
          value={userTopText}
          onChange={(e) => setUserTopText(e.target.value.replace(/\s/g, '_'))}
        />
        <p>Enter your bottom sentence:</p>
        <input
          value={userBottomText}
          onChange={(e) =>
            setUserBottomText(e.target.value.replace(/\s/g, '_'))
          }
        />
        <p>Select your meme here:</p>
        <select onChange={(event) => setImageKey(event.target.value)}>
          {arrMemeId.map((id) => (
            <option key={id} value={id}>
              {id}
            </option>
          ))}
        </select>
      </div>
      <div css={picture}>
        <img src={address} alt=" " />
      </div>

      <div>
        <button onClick={handleDownloadClick} download>
          Download meme
        </button>
      </div>
    </section>
  );
}
