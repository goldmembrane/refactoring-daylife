import { connect } from 'react-redux';
import Weekly from '../pages/Weekly';

const mapStateToProps = state => ({
  date: state.setDateReducer.date
});

export default connect(mapStateToProps)(Weekly);