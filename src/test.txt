import { useEffect, useState } from 'react';
import './App.css';

const Tile = ({ flagUrl, name, altFlag }) => {
  return (
    <div className="countryCard">
      <img src={flagUrl} alt={altFlag} style={{ width: '100px', height: '100px' }} />
      <h2>{name}</h2>
    </div>
  );
};

function App() {
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("https://restcountries.com/v3.1/all");
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setData(data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const filteredData = data.filter(item =>
    item.name.common.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className='app'>
      <input
        type='text'
        className='searchBar'
        placeholder='Search'
        onChange={(e) => setQuery(e.target.value)}
      />

      <div className='countryGrid'>
        {filteredData.length > 0 ? 
          filteredData.map((item) => (
            <Tile
              flagUrl={item.flags.png}
              name={item.name.common}
              altFlag={item.flags.alt}
              key={item.name.common}
            />
          )) :
          <p>No countries found</p>
        }
      </div>
    </div>
  );
}

export default App;
