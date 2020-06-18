import React from 'react';
import './App.css';
import chronicles from './chronicles.json';

function App() {
  return (
    <div className="App">


      <TreeNode node={chronicles.chronicles}/>

      
    </div>
  );
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
    const father = this.state.previousNode != null ? this.state.previousNode.name : null;
    const mother = this.state.currentNode.mother;
    const desc = this.state.currentNode.decription;
    const children = this.state.currentNode.children.map((child) =>

      (child.mother != null ? 
        <li>(via {child.mother}) --
          <button className="Button Node" onClick={() => this.goToChild(child)}>{child.name}</button>    
        </li>
        :  
        <li>
          <button className="Button Node" onClick={() => this.goToChild(child)}>{child.name}</button>    
        </li>
      )
    );

    return(
      <div className="Page">

        <div className="Node">
          <h2 id="name">{name}</h2>
          <p id="father">Father: {father}</p>
          <p id="mother">Mother: {mother != null ? mother : '?'}</p>
          <p id="description">Description: {desc}</p>
        </div>
        <div className="Child-List">
          <p>Children:</p>
          <ul>{children}</ul>
        </div>

      <button className="Button" onClick={() => this.returnToRoot()}>Return to Adam</button>

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
