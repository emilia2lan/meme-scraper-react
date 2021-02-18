/** @jsxImportSource @emotion/react */
import { css } from '@emotion/react';
import { useEffect, useState } from 'react';

const picture = css`
  display: flex;
  width: 150px;
  height: 400px;
`;

export function handleChange(e) {
  console.log(e.target.value);
}

export default function App() {
  let [imageKey, setImageKey] = useState('noidea');
  const [userText, setUserText] = useState('');
  const [userBottomText, setUserBottomText] = useState('');
  const [arrMemeId, setArrMemeId] = useState([]);
  const address = `https://api.memegen.link/images/${imageKey}/${userText}/${userBottomText}`;

  // parse the URL and get the memes (=>id)
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

  // download the meme together with the text in a jpg file
  function handleDownloadClick(props) {
    fetch(address).then((response) => {
      response.arrayBuffer().then((buffer) => {
        var element = document.createElement('a');
        var file = new Blob([buffer], { type: 'image/jpeg' });
        console.log('file: ', file);
        element.href = URL.createObjectURL(file);
        console.log('element.href: ', element.href);
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
          className="topSentence"
          type="text"
          value={userText}
          onChange={(e) => setUserText(e.target.value.replace(/\s/g, '_'))}
        />
        <p>Enter your bottom sentence:</p>
        <input
          className="bottomSentence"
          type="text"
          value={userBottomText}
          onChange={(e) =>
            setUserBottomText(e.target.value.replace(/\s/g, '_'))
          }
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
