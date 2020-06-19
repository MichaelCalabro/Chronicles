import React from 'react';
import './App.css';
import chronicles from './chronicles.json';

function App() {
  return (
    <div className="App">

      <PageHeader/>

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
        <li>
          <h3 className="Onciale">({child.mother})</h3>
          <button className="Button Node Onciale" onClick={() => this.goToChild(child)}>{child.name}</button>    
        </li>
        :  
        <li>
          <button className="Button Node Onciale" onClick={() => this.goToChild(child)}>{child.name}</button>    
        </li>
      )
    );

    //Only display description section if not null
    const descSection = desc != null ? <div><hr/>
    <p id="description" className="Onciale">{desc}</p></div> : null;

    return(
      <div className="Page">
        <div className="Node Main">
          <h2 id="name" className="Onciale">{name}</h2>
          <p id="father" className="Onciale">Father: {father != null ? father : '?'}</p>
          <p id="mother" className="Onciale">Mother: {mother != null ? mother : '?'}</p>
          {descSection}
        </div>
        <div className="Child-List">
          <h3 className="Onciale">Children:</h3>
          <ul>{children}</ul>
        </div>

      <button className="Button Onciale" onClick={() => this.returnToRoot()}>Return to Adam</button>

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


function PageHeader(){

  return(
    <header>
      <h1 className="Onciale">Chronicles</h1>   
    </header>
  );
}


export default App;
