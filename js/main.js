const $photoUrl = document.getElementById('photo-url');

const $image = document.querySelector('img');

$photoUrl.addEventListener('input', function (event) {
  $image.setAttribute('src', $photoUrl.value);
});
