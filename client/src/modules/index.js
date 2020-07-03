import { combineReducers } from 'redux';
import Daily from './Daily';
import Weekly from './Weekly';
import ReadPlans from './ReadPlans';
import WritePlan from './WritePlan';
import AmendPlan from './AmendPlan';


export default combineReducers ({
  Daily,
  Weekly,
  ReadPlans,
  WritePlan,
  AmendPlan
});