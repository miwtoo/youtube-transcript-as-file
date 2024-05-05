import Download from './Download';
import React from 'react';

const App: React.FC = () => {
  const [link, setLink] = React.useState("");

  return (
    <div>
      <input
        type="text"
        id="input-link"
        value={link}
        onChange={e => { setLink(e.target.value) }}
      />
      <Download link={link}></Download>
    </div>
  );
}

export default App
