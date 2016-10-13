var express     = require('express'); // express 미들웨어 호출
var app         = express();
var mongoose    = require('mongoose'); // mongoose 미들웨어 호출
var bodyParser  = require('body-parser'); // 데이터를 받아오기 위한 미들웨어 호출

// 서버가 HTML 렌더링을 할 때, EJS 엔진을 사용하도록 설정
app.set('view engine', 'ejs');
app.engine('html', require('ejs').renderFile);

 // Express에서 정적 파일 제공을 위해 선언 아래 방식 두가지 다 같은 방식이다.
 // /client/public/ index.html 로 첫 페이지 이동을 한다.
app.use(express.static(__dirname + '/client/public'));
// app.use('/', express.static(__dirname + '/client/public'));

var db = mongoose.connection; // mongoose 연결
db.on('error', console.error); // mongoose 연결 에러 확인
db.once('open', function(){
    console.log("Connected to mongod server"); // mongoose 연결 확인 메시지 출력
});

mongoose.connect('mongodb://localhost/choco'); // choco 데이터 베이스 연결

var Content = require('./models/content'); // mongodb 'content' collection 생성 모듈 호출

app.use(bodyParser.urlencoded({ extended: true })); // 폼 데이터 입력을 받기 위한 사용 설정
app.use(bodyParser.json()); // 폼 데이터 입력을 받기 위한 사용 설정

var router = require('./routes')(app, Content); // 라우트 기능

var port = 8080;
var server = app.listen(port, function(){
  console.log("Express server has started on port " + port);
});
