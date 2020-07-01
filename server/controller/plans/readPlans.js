const { user } = require('../../modules');
const { calender } = require('../../models');
const { interm_check } = require('../../models');
const jwt = require('jsonwebtoken');

module.exports = {
   get: (req, res) => {
      let category = req.params.category;   //Path Params
      let year = req.params.year;
      let month = req.params.month;
      let week = req.params.week;
      let day = req.params.day;

      let token = req.cookies.token; //cookie

      if (!token) {  //토큰이 없는 경우
         res.status(401);
         res.json({ 'message': 'need user session' });
         res.end();
      } else {
         let decoded = jwt.verify(token, process.env.SECRET_KEY) //export SECRET_KEY='urSecretKey'
         //변경 필요, 어떻게 값이 넘어오는지 중요
         let userId = decoded.userid;
         let startDate, endDate;


         let resData = {};
         switch (category) {  //년 -> 월 -> 주 -> 일, 상위 카테고리가 하위 카테고리 정보까지 전부 포함
            case 'year':   //년 단위 데이터
               startDate = year + '-' + '01' + '-' + '01';
               endDate = year + '-' + '12' + '-' + '31';
               resData.year;
               await calender.find({
                  where: {
                     category: category,
                     start: { [Op.gte]: startDate }, end: { [Op.lte]: endDate }
                  }
               }).then(data => {
                  resData.year = data;
               })

            case 'month':  //월 단위 데이터
               let lastDay = (new Date(year, month, 0)).getDate();
               startDate = year + '-' + month + '-' + 01
               endDate = year + '-' + month + '-' + lastDay;

               await calender.findAll({
                  where: {
                     category: category,
                     start: { [Op.gte]: startDate }, end: { [Op.lte]: endDate }
                  }
               }).then(data => {
                  resData.month = data;
               })

            case 'week':   //주 단위 데이터
               let tmpday = 1 + ((week - 1) * 7)
               let dayOfWeek = new Date(year, month, tmpday).getDay();   //일요일: 0 ~ 토요일: 6
               let startDay = day - dayOfWeek;  //해당 주 일요일

               startDate = year + '-' + month + '-' + startDay;
               endDate = year + '-' + month + '-' + startDay + 6;

               await calender.findAll({
                  where: {
                     category: category,
                     start: { [Op.gte]: startDate }, end: { [Op.lte]: endDate }
                  }
               }).then(data => {
                  resData.week = data;
               })

            case 'day': //일 단위 데이터
               startDate = year + '-' + month + '-' + day

               await calender.findAll({
                  where: {
                     category: category,
                     start: { [Op.gte]: startDate }, end: { [Op.lte]: endDate }
                  }
               }).then(data => {
                  resData.day = data;
               })

               break;
            default:
               res.status(403);
               res.json({ 'message': 'forbidden' });
               res.end();
         }

         res.status(200);
         res.json(resData);
         res.end();
      }
   }
};
