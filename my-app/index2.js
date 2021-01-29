fetch('https://memegen.link/')
  .then((response) => response.json())
  .then((data) => console.log(data));
