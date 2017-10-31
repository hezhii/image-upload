const express = require('express');
const http = require('http');
const multiparty = require('multiparty');
const path = require('path');
const fs = require('fs');

const app = express();

app.use('/', express.static(path.join(__dirname, './public')));

app.post('/avatar', handleUpload);

let port = process.env.PORT || 8080;
app.set('port', port);

let server = http.createServer(app);

server.listen(port, function () {
  console.log(`Server passport listening on port: ${port}`);
});

function handleUpload(req, res, next) {
  const uploadDir = './public/uploads/';
  const form = new multiparty.Form({
    uploadDir: uploadDir,
    maxFilesSize: 2 * 1024 * 1024
  });

  form.parse(req, function (err, fields, files) {
    if (err) {
      console.log(err);
      return res.json('文件大小超过 2 MB');
    }
    const file = files.avatar[0];
    fs.rename(path.normalize(file.path), uploadDir + file.originalFilename, function (err) {
      if (err) {
        console.log(err);
        res.json('上传文件失败');
      }
      else {
        res.json('上传成功');
      }
    });
  });
}
