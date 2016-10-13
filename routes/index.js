module.exports = function(app, Content)
{
  // admin.html 페이지 라우팅
  app.get('/admin', function(req, res){
    res.render('./../client/public/admin.html');
  });

  // 모든 데이터 조회
  app.get('/api/contents', function(req,res){
    Content.find(function(err, contents){
      if(err) return res.status(500).send({err: 'database failure'});
      res.json(contents);
    });
  });

  // 특정 값 데이터 조회
  app.post('/api/search', function(req, res){
    // 일치되는 값 전체 출력
    Content.find({name: req.body.name}, function(err, contents){
      if(err) return res.status(500).send({err: 'database failure'});
      res.json(contents);
    });
    // 일치되는 값 1개 출력
    // Content.findOne({name: req.body.name}, function(err, content){
    //   if(err) return res.status(500).json({error: err});
    //   if(!content) return res.status(404).json({error: 'content not found'});
    //   res.json(content);
    // });
  });

  // 데이터 생성
  app.post('/api/insert', function(req, res){ //
    var content = new Content();
    // console.log("req.body.name : ",req.body.name);
      content.name = req.body.name;
      content.photo = req.body.photo;
      content.good = req.body.good;
      content.bad = req.body.bad;
      content.price = req.body.price;
      content.important = req.body.important;

      content.save(function(err){
          if(err){
              console.error(err);
              res.json({result: "error"});
              return;
          }
      });
      // res.send('input success');
      res.redirect('/admin'); //
      // res.json({result: "success"});
  });

  // 데이터 수정
  // app.put('/api/contents/:name', function(req, res){
  //   Content.update({ name: req.params.name }, { $set: req.body }, function(err, output){
  //     if(err) res.status(500).json({ error: 'database failure' });
  //     console.log(output);
  //     if(!output.n) return res.status(404).json({ error: 'content not found' });
  //     res.json( { message: 'content updated' } );
  //   });
  // });

  // 데이터 제거
  // app.delete('/api/contents/:name', function(req, res){
  //   Content.remove({ _id: req.params.name }, function(err, output){
  //     if(err) return res.status(500).json({ error: "database failure" });
  //     res.status(204).end();
  //   });
  // });

};
