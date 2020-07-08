import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

class Checkboxes extends React.Component{
constructor(props){
    super(props)
}
  render(){
    return(
      <div>
        <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} onClick={()=> this.props.handleCheckboxClick()} />
      </div>
    )
  }
}
export default Checkboxes;


/*App.js에 넣었던 내용 -> 병현님 코드 Pull해서 필요한 위치에 수정해서 각각 넣을 것

import React from 'react';
import Checkboxes from './Checkboxes';

class App extends React.Component{
  constructor(props){
    super(props)
    this.state = {is_done:false};// App.js가 아닌 src/Components/Checkboxes에 {is_done: false}넣어두기
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
  }

  handleCheckboxClick(){
    this.setState(prevState => ({
      is_done:!prevState.is_done
    }));
  }

  render(){
    return(
      <div>
        <Checkboxes is_done = {this.state.is_done} handleCheckboxClick = {this.handleCheckboxClick} />
      </div>
    )
  }
}

export default App;

*/
