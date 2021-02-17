/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

const memeApp = css`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-row: auto;
  padding-top: 25px;

  h1 {
    font-family: sans-serif;
    margin: 25px;
    grid-column: 1 / 2;
  }
  p {
    font-family: sans-serif;
    grid-column: 1;
  }

  .topSentence {
    grid-column: 1;
    height: 25px;
  }
  .bottomSentence {
    grid-column: 1;
    height: 25px;
  }
  .select {
    grid-column: 1;
    height: 30px;
    margin-bottom: 20px;
  }
  .meme {
    grid-column: 3;
  }
`;

export function handleChange(e) {
  console.log(e.target.value);
}

export default function App() {
  let [imageKey, setImageKey] = useState('noidea');
  const [userText, setUserText] = useState('');
  const [userBottomText, setUserBottomText] = useState('');
  const [arrMemeId, setArrMemeId] = useState([]);

  useEffect(() => {
    fetch('https://api.memegen.link/templates')
      .then((response) => response.json())
      .then((memeArr) => {
        console.log(memeArr[0].id);

        const responseArrMemeId = memeArr.map((meme) => {
          console.log(meme.id);
          return meme.id;
        });
        console.log(memeArr);
        setArrMemeId(responseArrMemeId);
      });
  }, []);

  return (
    <section>
      <div css={memeApp}>
        <h1>Meme Generator App</h1>
        <p>Enter your top sentence:</p>
        <input
          className="topSentence"
          type="text"
          value={userText}
          onChange={(e) => setUserText(e.target.value)}
        />
        <p>Enter your bottom sentence:</p>
        <input
          className="bottomSentence"
          type="text"
          value={userBottomText}
          onChange={(e) => setUserBottomText(e.target.value)}
        />
        <p>Select your meme here:</p>
        <select
          className="select"
          onChange={(event) => setImageKey(event.target.value)}
        >
          {arrMemeId.map((id) => (
            <option value={id}>{id}</option>
          ))}
        </select>
      </div>
      <div className="meme">
        <img
          src={`https://api.memegen.link/images/${imageKey}/${userText}/${userBottomText}`}
          alt=" "
        />
      </div>
    </section>
  );
}
