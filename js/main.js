/* exported data */

let data = {
  view: 'entry-form',
  entries: [],
  editing: null,
  nextEntryId: 1,
};

window.addEventListener('beforeunload', function (event) {
  const dataJSON = JSON.stringify(data);

  localStorage.setItem('journal-entry', dataJSON);
});

const previousDataJSON = localStorage.getItem('journal-entry');

if (previousDataJSON !== null) {
  data = JSON.parse(previousDataJSON);
}
// end of data.js

const $photoUrl = document.getElementById('photo-url');

const $image = document.querySelector('img');

const $form = document.getElementById('journal-entry');

$photoUrl.addEventListener('input', function (event) {
  $image.setAttribute('src', $photoUrl.value);
});

$form.addEventListener('submit', function (event) {
  event.preventDefault();

  const $title = $form.elements[0].value;
  const $photo = $form.elements[1].value;
  const $notes = $form.elements[2].value;

  const formObject = {
    title: $title,
    url: $photo,
    notes: $notes,
    entryID: data.nextEntryId,
  };

  data.nextEntryId++;

  data.entries.unshift(formObject);

  $image.setAttribute('src', 'images/placeholder-image-square.jpg');

  $form.reset();
});
