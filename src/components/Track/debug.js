


constructor(props){
  super(props);
  this.renderAction = this.renderAction.bind(this);
}

renderAction (isRemoval){
let action ="";
if (isRemoval) {return action= "-";} {return action = "+";}
}


  <a className="Track-action"> {this.action}</a>
  //this action has something to do with +  or -//
