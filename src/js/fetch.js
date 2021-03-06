(() => {
  'use strict';

  var cont = document.querySelector('.container.cards');

  let newCards,

    url = ['https://pokeapi.co/api/v2/pokemon/1', 'https://pokeapi.co/api/v2/pokemon/2', 'https://pokeapi.co/api/v2/pokemon/3', 'https://pokeapi.co/api/v2/pokemon/4'];

  function tarea() {

    //espera 2 argumentos, resolve, reject
    let promesa = new Promise((resolve, reject) => {
      for (var i in url) {
        fetch(url[i])
          .then(handleErrors)
          .then(parseJSON)
          .then(updatePokemon)
          .catch(Error);
      }

      console.log(cont.outerHTML);
      console.log(cont.style.display);
      resolve();

    });
    return promesa;
  }

  tarea()
    .then(() => {
      cont.style.display = 'flex';
    });

  function handleErrors(res) {
    if (!res.ok) {
      throw Error(res.status);
    }
    return res;
  }

  function parseJSON(res) {
    return res.json().then(function(parsedData) {
      return parsedData
    });
  }

  function updatePokemon(data) {

    newCards = `<section class="container card">
        <article class="card icon">
          <div class="icon circle one">
            <img src="${data.sprites.front_default}">
          </div>
        </article>
        <article class="items">
          <label class="item numbers">
            ${data.name}
          </label>
          <label class="item texto">
            ${data.abilities[0].ability.name}
          </label>
        </article>
      </section>`;

    cont.innerHTML += newCards;

  }

  function Error(err) {
    console.log(err);
  }


})();
