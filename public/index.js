(function (window, document) {
  document.getElementById('h5FileInput').addEventListener('change', function (e) {
    const reader = new FileReader();
    reader.addEventListener('load', function () {
      document.getElementById('preview').src = reader.result;
    });
    reader.readAsDataURL(this.files[0]);
  });
})(window, document);
