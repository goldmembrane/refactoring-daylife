const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const cookieParser = require('cookie-parser');

const plansRouter = require('./routes/plans');
const userRouter = require('./routes/user');

const app = express();
const port = 3001;

app.use(cookieParser());
app.use(bodyParser.json());

//클라이언트 제작 완료시, 클라이언트의 주소를 origin에 넣고, post, get, put메소드 허용
app.use(
    cors()
);

app.get('/', (req, res) => {
    res.statusCode = 200;
    res.send('Success');
});

app.use('/plans', plansRouter);
app.use('/user', userRouter);

app.set('port', port);
app.listen(app.get('port'), () => {
  console.log(`app is listening in PORT ${app.get('port')}`);
});

module.exports = app;
