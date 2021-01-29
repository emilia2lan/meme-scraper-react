import { useState } from 'react';

export function handleChange(e) {
  console.log(e.target.value);
}

export function UserText(props) {
  const [userText, setUserText] = useState('');
}

// exports the entire app function
export default function App() {
  const [userText, setUserText] = useState('');

  fetch('https://memegen.link/')
    .then((response) => response.json())
    .then((data) => console.log(data));

  return (
    <div className="App">
      <h1>Meme Generator App</h1>
      <img src="https://api.memegen.link/images/buzz/memes/memes_everywhere.png" />

      <form>
        <p>Enter your sentence below:</p>
        <input type="text" onChange={(e) => setUserText(e.target.value)} />
        <label>
          <input type="submit" value="Submit" />
        </label>
      </form>
    </div>
  );
}
