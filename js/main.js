/* global data */

const $photoUrl = document.getElementById('photo-url');
const $image = document.querySelector('img');
const $form = document.getElementById('journal-entry');
const $title = document.getElementById('title');
const $notes = document.getElementById('notes');
const $entryHeader = document.querySelector('.headline');
let liToReplace;

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
  };

  if (data.editing === null) {
    formObject.entryId = data.nextEntryId;

    data.entries.unshift(formObject);

    data.nextEntryId++;

    const newEntry = renderEntry(formObject);

    $ul.prepend(newEntry);
  } else {
    formObject.entryId = data.editing.entryId;

    for (let i = 0; i < data.entries.length; i++) {
      if (data.entries[i].entryId === formObject.entryId) {
        data.entries[i] = formObject;
      }
      const $lis = document.querySelectorAll('li');

      const updatedLi = renderEntry(formObject);

      for (let x = 0; x < $lis.length; x++) {
        const currentEntryId = Number($lis[x].getAttribute('data-entry-id'));

        if (currentEntryId === formObject.entryId) {
          liToReplace = $lis[x];
        }
      }
      liToReplace.replaceWith(updatedLi);
      console.log(updatedLi);
    }
    $entryHeader.textContent = 'New Entry';

    data.editing = null;
  }

  viewSwap('entries');

  $image.setAttribute('src', 'images/placeholder-image-square.jpg');

  $form.reset();

  toggleNoEntriesText();
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

  $listItem.setAttribute('data-entry-id', entry.entryId);

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

$ul.addEventListener('click', function (event) {
  if (event.target.tagName === 'I') {
    viewSwap('entry-form');

    const clickedParent = event.target.closest('li');
    const idValue = Number(clickedParent.getAttribute('data-entry-id'));

    for (let i = 0; i < data.entries.length; i++) {
      if (idValue === data.entries[i].entryId) {
        data.editing = data.entries[i];

        $image.setAttribute('src', data.entries[i].url);

        $photoUrl.value = data.entries[i].url;

        $title.value = data.entries[i].title;

        $notes.value = data.entries[i].notes;

        $entryHeader.textContent = 'Edit Entry';
      }
    }
  }
});
