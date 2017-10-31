const express = require('express');
const http = require('http');
const multiparty = require('multiparty');
const path = require('path');
const fs = require('fs');
const sharp = require('sharp');
const uuidv1 = require('uuid/v1');

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
    sharp(file.path).resize(638).toFile(uploadDir + uuidv1() + '.jpeg', function (err) {
      if (err) {
        console.log(err);
        return res.json('上传失败');
      }
      fs.unlink(file.path);
      res.json('上传成功');
    });
  });
}
