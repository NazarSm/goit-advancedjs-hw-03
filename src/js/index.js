import SlimSelect from "slim-select";
import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";
const ERROR_MESSAGE = "Something went wrong!";

import { fetchBreeds, fetchCatByBreedId } from "./cat-api.js";

const breedSelect = document.querySelector('.breed-select');
const pageLoader = document.querySelector('.loader');
const catInfo = document.querySelector('.cat-info');

const makeVisible = (element) => {
  element.classList.remove('visually-hidden');
}

const makeHidden = (element) => {
  element.classList.add('visually-hidden');
}

makeHidden(breedSelect);
makeVisible(pageLoader);

const showBreedList = (data) => {
  const breedsInfo = data.map(({ id, name }) => {
    return { text: name, value: id };
  });

  breedsInfo.unshift({text: '', placeholder: true});

  slimSelect.setData(breedsInfo);

  makeHidden(pageLoader);
  makeVisible(breedSelect);
}

const slimSelect = new SlimSelect({
  select: breedSelect,
  settings: {
    placeholderText: 'Select a breed:',
  },
  events: {
    afterChange: (newVal) => {
      const breedId = newVal[0].value;

      if (breedId) {
        makeHidden(catInfo);
        makeVisible(pageLoader);

        fetchCatByBreedId(breedId)
          .then(({ data }) => showCat(data[0]))
          .catch(() => {
            makeHidden(pageLoader);

            iziToast.error({
              message: ERROR_MESSAGE,
              position: "topRight",
            })
          });
      }
    }
  }
})

const showCat = (data) => {
  const {
    url,
    breeds: [
      { name, temperament, description }
    ]
  } = data;

  catInfo.innerHTML = `
    <img class="img" src="${url}" alt="${name}">
    <div class="cat-content">
      <div class="name">${name}</div>
      <div class="description">${description}</div>
      <div class="temperament">Temperament: ${temperament}</div>
    </div>
  `;

  makeHidden(pageLoader);
  makeVisible(catInfo);
}

fetchBreeds()
  .then(({ data }) => showBreedList(data))
  .catch(() => {
    makeHidden(pageLoader);

    iziToast.error({
      message: ERROR_MESSAGE,
      position: "topRight",
    })
  });
