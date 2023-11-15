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

  const newEntry = renderEntry(formObject);

  $ul.prepend(newEntry);

  toggleNoEntriesText();

  viewSwap('entries');
});

function renderEntry(entry) {
  const $listItem = document.createElement('li');
  $listItem.setAttribute('class', 'list-display');

  const $columnHalf = document.createElement('div');
  $columnHalf.setAttribute('class', 'column-half');
  $listItem.appendChild($columnHalf);

  const $image = document.createElement('img');
  $image.setAttribute('src', entry.url);
  $columnHalf.appendChild($image);

  const $columnHalf2 = document.createElement('div');
  $columnHalf2.setAttribute('class', 'column-half');
  $listItem.append($columnHalf2);

  const $titleContainer = document.createElement('div');
  $titleContainer.setAttribute('class', 'title-container');
  $columnHalf2.append($titleContainer);

  const $title = document.createElement('h2');
  $title.textContent = entry.title;
  $titleContainer.appendChild($title);

  const $pencil = document.createElement('i');
  $pencil.setAttribute('class', 'fa-solid fa-pencil fa-lg');
  $titleContainer.appendChild($pencil);

  const $notes = document.createElement('p');
  $notes.textContent = entry.notes;
  $columnHalf2.append($notes);

  $listItem.setAttribute('data-entry-id', entry.entryID);

  return $listItem;
}

const $ul = document.querySelector('ul');

document.addEventListener('DOMContentLoaded', function (event) {
  for (let i = 0; i < data.entries.length; i++) {
    const $dataEntries = renderEntry(data.entries[i]);

    $ul.appendChild($dataEntries);
  }

  const pageViewed = data.view;

  viewSwap(pageViewed);

  toggleNoEntriesText();
});

const $noEntriesText = document.querySelector('.no-entries');

function toggleNoEntriesText() {
  if (data.entries.length !== 0) {
    $noEntriesText.className = 'hidden';
  } else {
    $noEntriesText.className = 'no-entries';
  }
}

const $entriesView = document.querySelector('[data-view="entries"]');

const $formView = document.querySelector('[data-view="entry-form"]');

function viewSwap(view) {
  if (view === 'entries') {
    $entriesView.className = '';

    $formView.className = 'hidden';
  } else if (view === 'entry-form') {
    $entriesView.className = 'hidden';

    $formView.className = '';
  }

  data.view = view;
}

const $entriesToggle = document.querySelector('.entries-toggle');

$entriesToggle.addEventListener('click', function () {
  viewSwap('entries');
  toggleNoEntriesText();
});

const $newEntryButton = document.querySelector('.new-entry-toggle');

$newEntryButton.addEventListener('click', function () {
  viewSwap('entry-form');
});
