import { connect } from 'react-redux';
import Home from '../pages/Home';

const mapStateToProps = state => ({
  date: state.setDateReducer.date
});

export default connect(mapStateToProps)(Home);