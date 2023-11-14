/* global data */

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

function renderEntry(entry) {
  const $listItem = document.querySelector('li');

  return $listItem;
}

const $ul = document.querySelector('ul');

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    const $dataEntries = renderEntry(data.entries[i]);

    $ul.appendChild($dataEntries);
  }
});
