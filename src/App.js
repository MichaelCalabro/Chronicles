import React from 'react';
import './App.css';
import chronicles from './chronicles.json';

function App() {
  return (
    <div className="App">

      <PageHeader/>

      <Tree node={chronicles.chronicles}/>

      
    </div>
  );
}

class Tree extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      rootNode : props.node,
      currentNode : props.node,
      nodePath : [props.node]
    }
  }

  render(){
    const name = this.state.currentNode.name;
    const father = this.state.nodePath.length > 1 ? this.state.nodePath[this.state.nodePath.length - 2].name : null;
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

    //Only allow going back to father if father exists
    const fatherButton = this.state.nodePath.length > 1 ? 
      <button className="Button Onciale" onClick={() => this.goToFather()}>Return to Father</button>
      : null;

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
      {fatherButton}
    </div>
    )
  }


  goToChild(newNode){
    this.setState({
      currentNode: newNode,
      nodePath : this.state.nodePath.concat(newNode)
    });
  }

  returnToRoot(){
    this.setState({
      currentNode: this.state.rootNode,
      nodePath : [this.state.rootNode]
    });

  }

  goToFather(){
    this.setState({
      previousNode : this.state.currentNode, 
      currentNode: this.state.nodePath[this.state.nodePath.length - 2],
      nodePath : this.state.nodePath.filter((item, j) => this.state.nodePath.length - 1 !== j)
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
