import * as React from 'react';
import './App.css';

function App() {

  const [user, setUser] = React.useState('');
  const [result, setResult] = React.useState([]);

  function onSubmit(e) {
    e.preventDefault();
    let ele = document.getElementById('result');
    ele.style.display = 'none';
    const host = "https://vnxcollector.herokuapp.com";
    fetch(`${host}/${user}`)
    .then((res) => res.json())
    .then((data) => {
      setResult(JSON.parse(JSON.stringify(data)));
      ele.style.display = 'block';
    })
    .catch((err) => console.log(err));
  }

  return (
    <div className="App">
      <p id="tagline">collector 👨‍💻</p>
      <p id="desc">
        collector is a tool that shows a given user's top 5 GitHub contributions. Currently, only merged pull requests count as contributions. Ranking is based on how many forks the corresponding repository has.
      </p>

      <form>
       <input id="user" type="text" className="searchTerm" placeholder="username" onChange={(e) => setUser(e.target.value)}/>
       <button className="searchButton" onClick={(e) => onSubmit(e)}>
         go!
       </button>
      </form>

      <div id="result"> {
        (() => {
          if (result.length === 0) {
            return(<p>we've got nothing here</p>)
          } else {
            return(
              <table>
                <tbody>
                  <tr>
                    <th>repo</th>
                    <th>PR</th>
                  </tr>
                  {result.map((item, index) => (
                    <tr key={index}>
                      <td>{item.owner}/{item.repo}</td>
                      <td><a href={item.url}>#{item.pr}</a></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )  
          }
        })()
      }
      </div>

    </div>
  );
}

export default App;
