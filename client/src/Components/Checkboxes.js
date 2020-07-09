import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';

class Checkboxes extends React.Component {
  constructor(props) {
    super(props);
    this.state = {is_done:false}
    this.handleCheckboxClick = this.handleCheckboxClick.bind(this);
  }

  handleCheckboxClick() {
    this.setState(prevState => ({
      is_done: !prevState.is_done
    }));
  }

  render() {
    return (
      <Checkbox inputProps={{ 'aria-label': 'uncontrolled-checkbox' }} onClick={this.handleCheckboxClick}> {this.props.is_done ? false : true}</Checkbox>
    );
  }
}

export default Checkboxes;
