(function (window, document) {
  const inputElem = document.getElementById('h5FileInput');
  inputElem.addEventListener('change', function (e) {
    const reader = new FileReader();
    reader.addEventListener('load', function () {
      document.getElementById('preview').src = reader.result;
      document.getElementById('btn_save').removeAttribute('disabled');
    });
    reader.readAsDataURL(this.files[0]);
  });

  document.getElementById('btn_save').onclick = function (e) {
    const formData = new FormData();
    formData.append('avatar', inputElem.files[0]);

    const xhr = new XMLHttpRequest();
    xhr.open("post", '/avatar', true);
    xhr.responseType = 'json';
    xhr.onload = function () {
      if (xhr.status === 200) {
        const res = xhr.response;
        if (res.state === 'success') {
          alert('上传成功！图片地址为: ' + res.data.path);
        } else {
          alert('上传失败！' + res.message);
        }
      } else {
        alert(xhr.status + ': ' + xhr.statusText);
      }
    };
    xhr.send(formData);
  };
})(window, document);
