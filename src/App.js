import React from 'react';
import './App.css';
import chronicles from './chronicles.json';

function App() {
  return (
    <div className="App">
      <div id="root">
        <TreeNode id="node" node={chronicles.chronicles}/>
      </div>
    </div>
  );
}



function TreeString(props){
  return(
    <div>{JSON.stringify(chronicles)}</div>
  )
}


class TreeNode extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      rootNode : props.node,
      currentNode : props.node,
      previousNode : null
    }

  }

  render(){
    const name = this.state.currentNode.name;
    const mother = this.state.currentNode.mother;
    const desc = this.state.currentNode.decription;
    const children = this.state.currentNode.children.map((child) =>
      // <li><TreeNode node={child}/></li>
      <li>{child.name} 
        <button onClick={() => this.goToChild(child)}>Expand</button>    
      </li>
    );

    return(
      <div>

        <h2>{name}</h2>
        <div>Mother: {mother}</div>
        <div>Description: {desc}</div>
        <ul>Children: {children}</ul>

      <button onClick={() => this.returnToRoot()}>Return to Adam</button>

    </div>
    )
  }


  goToChild(newNode){
    this.setState({
      previousNode : this.state.currentNode, 
      currentNode: newNode
    });
  }

  returnToRoot(){
    this.setState({
      previousNode : null, 
      currentNode: this.state.rootNode
    });

  }
  

}



export default App;
