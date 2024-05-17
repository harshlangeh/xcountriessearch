import { useEffect, useState } from 'react';
import './App.css'




const Tile = ({flagUrl, name, altFlag}) => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
      margin: '10px',
      padding: '10px',
      border: '1px solid black',
      borderRadius: '8px',
      width: '200px'
    }}>
      <img src={flagUrl} alt={altFlag}  style={{width: '100px', height: '100px'}}/>
      <h2>{name}</h2>
    </div>
  )
}
function App() {
    const [data, setData] = useState([])
    const [query, setQuery] = useState("");
  useEffect(()=>{

    try {

      fetch("https://restcountries.com/v3.1/all")
      .then(res => res.json())
      .then(data => setData(data));  
    
      
    } catch (error) {
      console.log(error)
    }
      
      
  },[])
  // console.log(data)


  const filteredData = data.filter(item => item.name.common.toLowerCase().includes(query.toLowerCase())
  );

 
  
  return (

    <div className='countryCard'>
      <input
      type='text'
      style={{
        height: '3vh', 
        width: '90vw', 
        margin: '20px', 
      }}
      placeholder='Search'
      onChange={((e)=> setQuery(e.target.value))}
      />

      {query ?  

        <div className='countryCard'
        style={{
          // display: 'flex',
          // height: '100vh',
          // flexWrap: 'wrap',
          // justifyContent: 'center',
          // alignItems: 'center' 
          }}>

        {filteredData.map((item) => (
          <Tile 
          flagUrl={item.flags.png} 
          name={item.name.common} 
          altFlag={item.flags.alt} 
          key={item.name.common}/>
        ))}
        </div> :

            <div 
            className='countryCard'
            style={{
            // display: 'flex',
            // height: '100vh',
            // flexWrap: 'wrap',
            // justifyContent: 'center',
            // alignItems: 'center' 
            }}>
            {data && data.map((item) => <Tile flagUrl={item.flags.png} name={item.name.common} altFlag={item.flags.alt} key={item.name.common}/>)}
            </div>
      
      
      }

      
      
    </div>
    
  );
}
export default App;