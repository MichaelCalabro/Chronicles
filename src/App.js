import React from 'react';
import logo from './logo.svg';
import './App.css';
import chronicles from './chronicles.json';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}

      {/* <TreeString/> */}


      <TreeList/>

    </div>
  );
}



function TreeString(props){
  return(
    <div>{JSON.stringify(chronicles)}</div>
  )
}


function TreeList(props){

  const cr = chronicles.chronicles;
  const children = cr.children.map((child) =>
    <li>{TreeNode(child)}</li>
  );


  return(
    <div>
      <ul>
        <li>{cr.name}</li>
        <li>{cr.mother}</li>
        <li>{cr.decription}</li>
        <ul>{children}</ul>
      </ul>
    </div>
  )

}

function TreeNode(props){

  const children = props.children.map((child) =>
    <li>{TreeNode(child)}</li>
  );

  
  return(
    <div>
      <ul>
        <li>{props.name}</li>
        <li>{props.mother}</li>
        <li>{props.decription}</li>
        <ul>{children}</ul>
      </ul>
    </div>
  )
}



export default App;
