import React from 'react';
import './App.css';
import chronicles from './chronicles.json';
import { render } from '@testing-library/react';

function App() {
  return (
    <div className="App">

    
      <PageHeader/>

      <Tree root={chronicles.chronicles}/>

    </div>
  );
}

class Tree extends React.Component{

  constructor(props){
    super(props);

    this.state = {
      rootNode : props.root,
      currentNode : props.root,
      nodePath : [props.root]
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


    const pathItems = this.state.nodePath.map((node) =>
        (node.children.length > 0 ?
          <div>
            <button className="Path-Node Onciale" onClick={() => this.goBackToNode(node)}>{node.name}</button>
            <div class="VL1"></div>
          </div>
          :
          <button className="Path-Node Onciale" onClick={() => this.goBackToNode(node)}>{node.name}</button>
        )
    );

    return(
      <div>
        <div className="Main">
          <div className="Page">
            <div className="Node Main-Node">
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
        </div>

        <div className="SideBar">
          {pathItems}
        </div>
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

  goBackToNode(prevNode){
    const newPath = this.state.nodePath;

    while(newPath.length > 0){

      if(newPath[newPath.length - 1] == prevNode){
        break;
      }

      newPath.pop();
    }

    this.setState({
      currentNode : prevNode,
      nodePath : newPath
    })
  }

  goToFather(){
    this.goBackToNode(this.state.nodePath[this.state.nodePath.length -2]);
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
