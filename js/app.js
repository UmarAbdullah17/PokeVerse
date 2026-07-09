const API_BASE = "https://pokeapi.co/api/v2";
const MAX_POKEMON_ID = 1025;
const PAGE_SIZE = 24;

const typeColors = {
  normal: "#A8A77A",
  fire: "#EE8130",
  water: "#6390F0",
  electric: "#F7D02C",
  grass: "#7AC74C",
  ice: "#96D9D6",
  fighting: "#C22E28",
  poison: "#A33EA1",
  ground: "#E2BF65",
  flying: "#A98FF3",
  psychic: "#F95587",
  bug: "#A6B91A",
  rock: "#B6A136",
  ghost: "#735797",
  dragon: "#6F35FC",
  dark: "#705746",
  steel: "#B7B7CE",
  fairy: "#D685AD"
};

const regions = [
  { name: "Kanto", slug: "kanto", summary: "The first classic region, known for gyms, forests, caves, Team Rocket, and the original Pokemon League journey." },
  { name: "Johto", slug: "johto", summary: "A traditional region connected to Kanto, filled with old towers, legends, Apricorn culture, and historic towns." },
  { name: "Hoenn", slug: "hoenn", summary: "A tropical region of oceans, islands, volcanoes, weather legends, contests, and nature-focused adventure." },
  { name: "Sinnoh", slug: "sinnoh", summary: "A cold mountainous region famous for mythology, ancient ruins, and legends tied to time, space, and creation." },
  { name: "Unova", slug: "unova", summary: "A distant modern region with huge cities, bridges, deserts, and a story about truth, ideals, and Pokemon freedom." },
  { name: "Kalos", slug: "kalos", summary: "A stylish region shaped by beauty, fashion, Mega Evolution, ancient history, and grand city design." },
  { name: "Alola", slug: "alola", summary: "A sunny island region with trials, guardian deities, regional forms, Ultra Beasts, and strong local traditions." },
  { name: "Galar", slug: "galar", summary: "A stadium-focused region where gym battles feel like major sports events and Dynamax energy shapes battle culture." },
  { name: "Paldea", slug: "paldea", summary: "An open academy region built around free exploration, Titan Pokemon, Area Zero, and the Terastal phenomenon." }
];

const professorLines = [
  "The lab snacks are nervous.",
  "Reminder: do not challenge a Snorlax to a staring contest.",
  "If the screen sparkles, that was definitely science.",
  "Psyduck understands this website about as well as I do.",
  "A wild loading spinner appeared.",
  "Magikarp has requested more dramatic lighting.",
  "Your trainer license is probably in another backpack."
];

const mysteryPokemon = [
  "bulbasaur", "ivysaur", "venusaur", "charmander", "charmeleon", "charizard",
  "squirtle", "wartortle", "blastoise", "caterpie", "butterfree", "pidgeot",
  "rattata", "pikachu", "raichu", "sandshrew", "nidoran-f", "nidoran-m",
  "clefairy", "vulpix", "jigglypuff", "zubat", "oddish", "paras", "venonat",
  "diglett", "meowth", "psyduck", "golduck", "mankey", "growlithe", "poliwag",
  "abra", "machop", "bellsprout", "tentacool", "geodude", "ponyta", "slowpoke",
  "magnemite", "doduo", "seel", "grimer", "shellder", "gastly", "gengar",
  "onix", "drowzee", "krabby", "voltorb", "cubone", "lickitung", "koffing",
  "rhyhorn", "chansey", "tangela", "kangaskhan", "horsea", "staryu", "scyther",
  "jynx", "electabuzz", "magmar", "pinsir", "tauros", "magikarp", "lapras",
  "ditto", "eevee", "vaporeon", "jolteon", "flareon", "snorlax", "dratini",
  "dragonite", "chikorita", "cyndaquil", "totodile", "togepi", "mareep",
  "marill", "sudowoodo", "wooper", "espeon", "umbreon", "wobbuffet", "girafarig",
  "heracross", "sneasel", "teddiursa", "houndour", "phanpy", "larvitar",
  "treecko", "torchic", "mudkip", "poochyena", "zigzagoon", "ralts", "sableye",
  "mawile", "aron", "plusle", "minun", "roselia", "wailmer", "numel", "torkoal",
  "trapinch", "swablu", "solrock", "baltoy", "feebas", "castform", "shuppet",
  "duskull", "absol", "spheal", "bagon", "beldum", "turtwig", "chimchar",
  "piplup", "starly", "shinx", "cranidos", "shieldon", "buizel", "drifloon",
  "buneary", "gible", "riolu", "lucario", "croagunk", "snover", "rotom",
  "snivy", "tepig", "oshawott", "lillipup", "purrloin", "munna", "pidove",
  "roggenrola", "woobat", "drilbur", "audino", "timburr", "tympole", "sewaddle",
  "venipede", "cottonee", "petilil", "sandile", "darumaka", "scraggy", "yamask",
  "zorua", "minccino", "gothita", "solosis", "ducklett", "vanillite", "deerling",
  "emolga", "foongus", "joltik", "litwick", "axew", "cubchoo", "rufflet",
  "deino", "chespin", "fennekin", "froakie", "fletchling", "scatterbug",
  "litleo", "flabebe", "skiddo", "pancham", "furfrou", "espurr", "honedge",
  "spritzee", "swirlix", "inkay", "helioptile", "tyrunt", "amaura", "sylveon",
  "goomy", "phantump", "pumpkaboo", "bergmite", "noibat", "rowlet", "litten",
  "popplio", "pikipek", "yungoos", "grubbin", "rockruff", "mareanie", "mudbray",
  "dewpider", "fomantis", "morelull", "salandit", "stufful", "bounsweet",
  "comfey", "mimikyu", "jangmo-o", "grookey", "scorbunny", "sobble", "rookidee",
  "skwovet", "wooloo", "chewtle", "yamper", "rolycoly", "applin", "silicobra",
  "cramorant", "toxel", "sizzlipede", "clobbopus", "sinistea", "hatenna",
  "impidimp", "milcery", "falinks", "snom", "eiscue", "dreepy", "sprigatito",
  "fuecoco", "quaxly", "lechonk", "pawmi", "fidough", "smoliv", "nacli",
  "charcadet", "tadbulb", "maschiff", "shroodle", "toedscool", "klawf",
  "capsakid", "rellor", "flittle", "tinkatink", "wiglett", "bombirdier",
  "finizen", "varoom", "cyclizar", "greavard", "flamigo", "cetoddle", "frigibax"
];

let loadedPokemon = [];
let listOffset = 0;
let currentPokemonQuery = "pikachu";
const cache = new Map();

const elements = {
  heroSearch: document.getElementById("heroSearch"),
  searchInput: document.getElementById("searchInput"),
  filterInput: document.getElementById("filterInput"),
  pokemonList: document.getElementById("pokemonList"),
  detailPanel: document.getElementById("detailPanel"),
  compareForm: document.getElementById("compareForm"),
  compareOne: document.getElementById("compareOne"),
  compareTwo: document.getElementById("compareTwo"),
  compareResults: document.getElementById("compareResults"),
  loadMoreBtn: document.getElementById("loadMoreBtn"),
  typeGrid: document.getElementById("typeGrid"),
  regionGrid: document.getElementById("regionGrid"),
  favoritesGrid: document.getElementById("favoritesGrid"),
  professorText: document.getElementById("professorText"),
  teamBtn: document.getElementById("teamBtn"),
  silhouetteBtn: document.getElementById("silhouetteBtn"),
  quizBtn: document.getElementById("quizBtn"),
  funResult: document.getElementById("funResult"),
  toast: document.getElementById("toast")
};

document.addEventListener("DOMContentLoaded", init);

function init() {
  renderTypeGuide();
  renderRegions();
  renderFavorites();
  bindEvents();
  loadPokemonList();
  searchPokemon("pikachu");
}

function bindEvents() {
  elements.heroSearch?.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = elements.searchInput.value.trim().toLowerCase();
    if (query) searchPokemon(query);
  });

  elements.filterInput?.addEventListener("input", () => {
    renderPokemonList(loadedPokemon);
  });

  elements.loadMoreBtn?.addEventListener("click", loadPokemonList);

  elements.compareForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    comparePokemon();
  });

  document.querySelectorAll("[data-pokemon]").forEach((button) => {
    button.addEventListener("click", () => {
      searchPokemon(button.dataset.pokemon);
    });
  });

  document.querySelector("[data-random]")?.addEventListener("click", () => {
    const id = Math.floor(Math.random() * MAX_POKEMON_ID) + 1;
    searchPokemon(String(id));
    professorSay("Random encounter deployed. Please keep all sandwiches secure.");
  });

  elements.teamBtn?.addEventListener("click", buildRandomTeam);
  elements.silhouetteBtn?.addEventListener("click", startSilhouetteChallenge);
  elements.quizBtn?.addEventListener("click", startProfessorQuiz);
}

async function comparePokemon() {
  const firstQuery = elements.compareOne.value.trim().toLowerCase();
  const secondQuery = elements.compareTwo.value.trim().toLowerCase();

  if (!firstQuery || !secondQuery) {
    elements.compareResults.innerHTML = `<p class="soft-message">Enter two Pokemon names or IDs to start the battle lab.</p>`;
    return;
  }

  elements.compareResults.innerHTML = `
    <div class="loading-state compact-loading">
      <div class="loader"></div>
      <p>Comparing ${firstQuery} and ${secondQuery}...</p>
    </div>
  `;

  try {
    const [first, second] = await Promise.all([
      fetchPokemon(firstQuery),
      fetchPokemon(secondQuery)
    ]);

    renderComparison(first, second);
    professorSay(`Comparison complete: ${capitalize(first.name)} versus ${capitalize(second.name)}.`);
  } catch (error) {
    elements.compareResults.innerHTML = `<p class="soft-message">Could not compare those Pokemon. Try valid names or IDs from the Pokedex.</p>`;
  }
}

function renderComparison(first, second) {
  const firstTotal = totalStats(first);
  const secondTotal = totalStats(second);
  const winner = firstTotal === secondTotal
    ? "It is a total-stat tie."
    : `${capitalize(firstTotal > secondTotal ? first.name : second.name)} has the higher base stat total.`;

  elements.compareResults.innerHTML = `
    <div class="compare-summary">
      <h3>${capitalize(first.name)} vs ${capitalize(second.name)}</h3>
      <p>${winner}</p>
    </div>
    <div class="compare-grid">
      ${compareProfile(first, second)}
      <div class="versus-badge">VS</div>
      ${compareProfile(second, first)}
    </div>
    <div class="compare-stat-table">
      ${first.stats.map(({ stat, base_stat }, index) =>
        compareStatRow(stat.name, base_stat, second.stats[index].base_stat)
      ).join("")}
      ${compareStatRow("total", firstTotal, secondTotal)}
    </div>
  `;
}

function compareProfile(pokemon, opponent) {
  const total = totalStats(pokemon);
  const opponentTotal = totalStats(opponent);
  const types = pokemon.types.map(({ type }) => typeBadge(type.name)).join("");
  const abilities = pokemon.abilities.map(({ ability }) => formatName(ability.name)).join(", ");

  return `
    <article class="compare-card ${total > opponentTotal ? "compare-winner" : ""}">
      <img src="${getArtwork(pokemon)}" alt="${pokemon.name}">
      <p class="eyebrow">#${padId(pokemon.id)}</p>
      <h3>${capitalize(pokemon.name)}</h3>
      <div class="badge-row">${types}</div>
      <div class="compare-facts">
        ${factCard("Total Stats", total)}
        ${factCard("Height", `${pokemon.height / 10} m`)}
        ${factCard("Weight", `${pokemon.weight / 10} kg`)}
        ${factCard("Abilities", abilities)}
      </div>
    </article>
  `;
}

function compareStatRow(label, firstValue, secondValue) {
  const firstWins = firstValue > secondValue;
  const secondWins = secondValue > firstValue;

  return `
    <div class="compare-stat-row">
      <strong class="${firstWins ? "stat-win" : ""}">${firstValue}</strong>
      <span>${formatName(label)}</span>
      <strong class="${secondWins ? "stat-win" : ""}">${secondValue}</strong>
    </div>
  `;
}

async function loadPokemonList() {
  setListLoading(true);

  try {
    const response = await fetch(`${API_BASE}/pokemon?limit=${PAGE_SIZE}&offset=${listOffset}`);
    if (!response.ok) throw new Error("Could not load Pokemon list");

    const data = await response.json();
    const detailed = await Promise.all(
      data.results.map((pokemon) => fetchPokemon(pokemon.name))
    );

    loadedPokemon = [...loadedPokemon, ...detailed];
    listOffset += PAGE_SIZE;
    renderPokemonList(loadedPokemon);
  } catch (error) {
    showToast("Could not load Pokemon. Check your internet connection.");
  } finally {
    setListLoading(false);
  }
}

function renderPokemonList(pokemon) {
  const filter = elements.filterInput.value.trim().toLowerCase();
  const filtered = filter
    ? pokemon.filter((item) => item.name.includes(filter) || String(item.id).includes(filter))
    : pokemon;

  if (!filtered.length) {
    elements.pokemonList.innerHTML = `<p class="soft-message">No loaded Pokemon match that filter.</p>`;
    return;
  }

  elements.pokemonList.innerHTML = filtered.map((item) => {
    const art = getArtwork(item);
    const types = item.types.map(({ type }) => type.name).join(" / ");

    return `
      <button class="list-card" type="button" onclick="searchPokemon('${item.name}')">
        <img src="${art}" alt="${item.name} sprite">
        <span>
          <strong>#${padId(item.id)} ${capitalize(item.name)}</strong>
          <small>${types}</small>
        </span>
      </button>
    `;
  }).join("");
}

async function searchPokemon(query) {
  const cleanQuery = String(query).trim().toLowerCase();
  if (!cleanQuery) return;

  currentPokemonQuery = cleanQuery;
  elements.searchInput.value = cleanQuery;
  setDetailLoading(cleanQuery);

  try {
    const pokemon = await fetchPokemon(cleanQuery);
    const species = await fetchJson(pokemon.species.url);
    const evolution = species.evolution_chain?.url
      ? await fetchJson(species.evolution_chain.url)
      : null;

    renderPokemonDetails(pokemon, species, evolution);
    reactToPokemon(pokemon);
    document.getElementById("pokedex")?.scrollIntoView({ behavior: "smooth", block: "start" });
  } catch (error) {
    elements.detailPanel.innerHTML = `
      <div class="error-state">
        <h3>Pokemon not found</h3>
        <p>Try a name like "mewtwo" or an ID like "150".</p>
      </div>
    `;
    professorSay("That Pokemon dodged the search beam. Try another spelling.");
  }
}

async function fetchPokemon(nameOrId) {
  const key = String(nameOrId).toLowerCase();
  if (cache.has(key)) return cache.get(key);

  const pokemon = await fetchJson(`${API_BASE}/pokemon/${key}`);
  cache.set(key, pokemon);
  cache.set(String(pokemon.id), pokemon);
  cache.set(pokemon.name, pokemon);
  return pokemon;
}

async function fetchJson(url) {
  const response = await fetch(url);
  if (!response.ok) throw new Error(`Request failed: ${url}`);
  return response.json();
}

function renderPokemonDetails(pokemon, species, evolution) {
  const art = getArtwork(pokemon);
  const flavor = getEnglishFlavor(species);
  const genus = getEnglishGenus(species);
  const abilities = pokemon.abilities.map(({ ability }) => capitalize(ability.name)).join(", ");
  const moves = pokemon.moves.slice(0, 8).map(({ move }) => `<span>${formatName(move.name)}</span>`).join("");
  const types = pokemon.types.map(({ type }) => typeBadge(type.name)).join("");
  const stats = pokemon.stats.map(({ base_stat, stat }) => statRow(stat.name, base_stat)).join("");
  const evolutionCards = evolution ? renderEvolutionChain(evolution.chain) : "";
  const isFavorite = getFavorites().includes(pokemon.name);

  elements.detailPanel.innerHTML = `
    <div class="pokemon-profile">
      <div class="profile-hero">
        <div>
          <p class="eyebrow">#${padId(pokemon.id)} ${genus}</p>
          <h2>${capitalize(pokemon.name)}</h2>
          <div class="badge-row">${types}</div>
          <p>${flavor}</p>
          <button class="favorite-btn ${isFavorite ? "active" : ""}" type="button" onclick="toggleFavorite('${pokemon.name}')">
            ${isFavorite ? "Saved to Favorites" : "Add to Favorites"}
          </button>
        </div>
        <img class="profile-art" src="${art}" alt="${pokemon.name} official artwork">
      </div>

      <div class="info-grid">
        ${factCard("Height", `${pokemon.height / 10} m`)}
        ${factCard("Weight", `${pokemon.weight / 10} kg`)}
        ${factCard("Base XP", pokemon.base_experience || "Unknown")}
        ${factCard("Abilities", abilities)}
      </div>

      <div class="detail-grid">
        <section class="stats-card">
          <h3>Base stats</h3>
          ${stats}
        </section>
        <section class="moves-card">
          <h3>Featured moves</h3>
          <div class="move-list">${moves || "<p>No moves listed.</p>"}</div>
        </section>
      </div>

      <section class="evolution-card">
        <h3>Evolution chain</h3>
        <div class="evolution-line">${evolutionCards || "<p>No evolution data found.</p>"}</div>
      </section>
    </div>
  `;
}

function reactToPokemon(pokemon) {
  const mainType = pokemon.types[0]?.type.name;
  const reactions = {
    electric: "Static detected. Hair may become pointy.",
    fire: "Warm gloves recommended. Very warm.",
    water: "Splash zone activated.",
    grass: "Photosynthesis levels are immaculate.",
    psychic: "This Pokemon already knew you would click.",
    ghost: "The lab lights flickered. Probably normal.",
    dragon: "Dragon readings are off the chart.",
    fairy: "Sparkle density has increased by 400 percent.",
    normal: "A classic choice. Reliable, cozy, and possibly hungry."
  };

  professorSay(reactions[mainType] || randomItem(professorLines));

  if (pokemon.name === "magikarp") {
    showToast("Magikarp used Splash. The website politely applauded.");
  }

  if (pokemon.name === "ditto") {
    document.body.classList.add("ditto-mode");
    window.setTimeout(() => document.body.classList.remove("ditto-mode"), 2200);
  }
}

function renderEvolutionChain(chain) {
  const names = [];
  let current = chain;

  while (current) {
    names.push(current.species.name);
    current = current.evolves_to[0];
  }

  return names.map((name) => `
    <button type="button" class="evolution-node" onclick="searchPokemon('${name}')">
      <img src="https://img.pokemondb.net/sprites/home/normal/${name}.png" alt="${name}">
      <span>${capitalize(name)}</span>
    </button>
  `).join("");
}

function renderTypeGuide() {
  elements.typeGrid.innerHTML = Object.entries(typeColors).map(([type, color]) => `
    <div class="type-card type-name-card" style="--type-color:${color}">
      <span class="type-symbol">${type.slice(0, 2).toUpperCase()}</span>
      <span>${capitalize(type)}</span>
    </div>
  `).join("");
}

async function searchType(type) {
  const matches = loadedPokemon.filter((pokemon) =>
    pokemon.types.some(({ type: itemType }) => itemType.name === type)
  );

  if (matches.length) {
    renderPokemonList(matches);
    document.getElementById("pokedex")?.scrollIntoView({ behavior: "smooth", block: "start" });
    showToast(`Showing loaded ${type} Pokemon.`);
  } else {
    showToast("Load more Pokemon, then try that type again.");
  }
}

function renderRegions() {
  elements.regionGrid.innerHTML = regions.map((region) => `
    <article class="region-card">
      <h3>${region.name}</h3>
      <p>${region.summary}</p>
      <a class="region-link" href="regions.html#${region.slug}">Learn More</a>
    </article>
  `).join("");
}

async function buildRandomTeam() {
  elements.funResult.innerHTML = `
    <div class="team-builder">
      <p class="eyebrow">Team builder</p>
      <h3>Building a surprise team...</h3>
      <div class="loader"></div>
    </div>
  `;

  const ids = Array.from({ length: 6 }, () => Math.floor(Math.random() * MAX_POKEMON_ID) + 1);
  const team = await Promise.all(ids.map((id) => fetchPokemon(id)));

  elements.funResult.innerHTML = `
    <div class="team-builder">
      <div>
        <p class="eyebrow">Team builder</p>
        <h3>Your random squad is ready.</h3>
        <p>Click any teammate to open its full Pokedex profile.</p>
      </div>
      <div class="team-grid">
        ${team.map((pokemon) => `
          <button type="button" onclick="searchPokemon('${pokemon.name}')">
            <img src="${getArtwork(pokemon)}" alt="${pokemon.name}">
            <strong>${capitalize(pokemon.name)}</strong>
            <span>${pokemon.types.map(({ type }) => capitalize(type.name)).join(" / ")}</span>
          </button>
        `).join("")}
      </div>
    </div>
  `;

  professorSay("A random team has entered the chat.");
}

async function startSilhouetteChallenge() {
  const answer = randomItem(mysteryPokemon);
  const pokemon = await fetchPokemon(answer);
  const choices = shuffleOptions([
    answer,
    ...shuffleOptions(mysteryPokemon.filter((name) => name !== answer)).slice(0, 3)
  ]);

  elements.funResult.innerHTML = `
    <div class="silhouette-game">
      <div>
        <p class="eyebrow">Shadow scan</p>
        <h3>Who's that Pokemon?</h3>
      </div>
      <img class="silhouette-img" src="${getArtwork(pokemon)}" alt="Mystery Pokemon silhouette">
      <div class="silhouette-options">
        ${choices.map((choice) => `<button type="button" data-guess="${choice}">${capitalize(choice)}</button>`).join("")}
      </div>
    </div>
  `;

  elements.funResult.querySelectorAll("[data-guess]").forEach((button) => {
    button.addEventListener("click", () => {
      const correct = button.dataset.guess === answer;

      if (correct) {
        elements.funResult.querySelector(".silhouette-img").classList.add("revealed");
        elements.funResult.querySelectorAll("[data-guess]").forEach((option) => {
          option.disabled = true;
        });
        button.classList.add("correct-answer");
        professorSay("Correct. Your silhouette skills are suspiciously good.");
        window.setTimeout(startSilhouetteChallenge, 900);
        showToast("Correct guess. Next shadow incoming.", "success");
      } else {
        button.classList.add("wrong-answer");
        button.disabled = true;
        elements.funResult.querySelector(".silhouette-img").classList.add("revealed");
        elements.funResult.querySelectorAll("[data-guess]").forEach((option) => {
          option.disabled = true;
        });
        document.querySelector(".silhouette-game").insertAdjacentHTML("beforeend", `
          <p class="quiz-feedback">
            Correct answer: <strong>${capitalize(answer)}</strong>
            <button type="button" id="nextSilhouetteBtn">Next Question</button>
          </p>
        `);
        document.getElementById("nextSilhouetteBtn").addEventListener("click", startSilhouetteChallenge);
        professorSay(`Not that one. It was ${capitalize(answer)}.`);
        showToast("Answer revealed.", "error");
      }
    });
  });
}

async function startProfessorQuiz() {
  elements.funResult.innerHTML = `
    <div class="quiz-card">
      <p class="eyebrow">Type quiz</p>
      <h3>Loading a mystery Pokemon...</h3>
      <div class="loader"></div>
    </div>
  `;

  const pokemon = await fetchPokemon(Math.floor(Math.random() * MAX_POKEMON_ID) + 1);
  const correct = pokemon.types[0].type.name;
  const choices = shuffleOptions([
    correct,
    ...shuffleOptions(Object.keys(typeColors).filter((type) => type !== correct)).slice(0, 3)
  ]);

  elements.funResult.innerHTML = `
    <div class="quiz-card">
      <p class="eyebrow">Type quiz</p>
      <h3>What type is ${capitalize(pokemon.name)}?</h3>
      <img class="quiz-pokemon" src="${getArtwork(pokemon)}" alt="${pokemon.name}">
      <div class="quiz-options">
        ${choices.map((answer) => `<button type="button" data-answer="${answer}">${capitalize(answer)}</button>`).join("")}
      </div>
      <p class="quiz-feedback" id="quizFeedback"></p>
    </div>
  `;

  elements.funResult.querySelectorAll("[data-answer]").forEach((button) => {
    button.addEventListener("click", () => {
      const isCorrect = button.dataset.answer === correct;
      button.classList.add(isCorrect ? "correct-answer" : "wrong-answer");
      elements.funResult.querySelectorAll("[data-answer]").forEach((option) => {
        option.disabled = true;
      });

      if (isCorrect) {
        professorSay("Correct. Loading another type question.");
        showToast("Correct. Next question coming up.", "success");
        window.setTimeout(startProfessorQuiz, 900);
      } else {
        document.getElementById("quizFeedback").innerHTML = `
          Correct answer: <strong>${capitalize(correct)}</strong>
          <button type="button" id="nextQuizBtn">Next Question</button>
        `;
        document.getElementById("nextQuizBtn").addEventListener("click", startProfessorQuiz);
        professorSay(`Not quite. Correct answer: ${capitalize(correct)}.`);
        showToast("Answer revealed.", "error");
      }
    });
  });
}

function toggleFavorite(name) {
  const favorites = getFavorites();
  const exists = favorites.includes(name);
  const nextFavorites = exists
    ? favorites.filter((item) => item !== name)
    : [...favorites, name];

  localStorage.setItem("pokeVerseFavorites", JSON.stringify(nextFavorites));
  renderFavorites();
  searchPokemon(name);
  showToast(exists ? "Removed from favorites." : "Added to favorites.");
}

async function renderFavorites() {
  const favorites = getFavorites();

  if (!favorites.length) {
    elements.favoritesGrid.innerHTML = `<p class="soft-message">Favorite Pokemon will appear here after you save them.</p>`;
    return;
  }

  const favoritePokemon = await Promise.all(favorites.map((name) => fetchPokemon(name)));
  elements.favoritesGrid.innerHTML = favoritePokemon.map((pokemon) => `
    <button type="button" class="favorite-card" onclick="searchPokemon('${pokemon.name}')">
      <img src="${getArtwork(pokemon)}" alt="${pokemon.name}">
      <strong>${capitalize(pokemon.name)}</strong>
      <span>#${padId(pokemon.id)}</span>
    </button>
  `).join("");
}

function getFavorites() {
  return JSON.parse(localStorage.getItem("pokeVerseFavorites")) || [];
}

function typeBadge(type) {
  return `<span class="type-badge" style="--type-color:${typeColors[type] || "#94A3B8"}">${capitalize(type)}</span>`;
}

function statRow(name, value) {
  const percent = Math.min(100, Math.round((value / 255) * 100));
  return `
    <div class="stat-row">
      <span>${formatName(name)}</span>
      <strong>${value}</strong>
      <div class="stat-track"><span style="width:${percent}%"></span></div>
    </div>
  `;
}

function factCard(label, value) {
  return `
    <div class="fact-card">
      <span>${label}</span>
      <strong>${value}</strong>
    </div>
  `;
}

function totalStats(pokemon) {
  return pokemon.stats.reduce((total, item) => total + item.base_stat, 0);
}

function setDetailLoading(query) {
  elements.detailPanel.innerHTML = `
    <div class="loading-state">
      <div class="loader"></div>
      <p>Scanning PokeVerse for ${query}...</p>
    </div>
  `;
}

function setListLoading(isLoading) {
  elements.loadMoreBtn.disabled = isLoading;
  elements.loadMoreBtn.textContent = isLoading ? "Loading..." : "Load More";
}

function showToast(message, type = "info") {
  elements.toast.textContent = message;
  elements.toast.className = `toast visible ${type}`;
  window.clearTimeout(showToast.timeout);
  showToast.timeout = window.setTimeout(() => {
    elements.toast.classList.remove("visible");
  }, 2400);
}

function professorSay(message) {
  if (!elements.professorText) return;
  elements.professorText.textContent = message;
}

function getArtwork(pokemon) {
  return pokemon.sprites.other["official-artwork"].front_default
    || pokemon.sprites.other.home.front_default
    || pokemon.sprites.front_default;
}

function getEnglishFlavor(species) {
  const entry = species.flavor_text_entries.find((item) => item.language.name === "en");
  return entry ? entry.flavor_text.replace(/\s+/g, " ") : "No description available yet.";
}

function getEnglishGenus(species) {
  const entry = species.genera.find((item) => item.language.name === "en");
  return entry ? entry.genus : "Pokemon";
}

function padId(id) {
  return String(id).padStart(4, "0");
}

function capitalize(text) {
  return String(text).charAt(0).toUpperCase() + String(text).slice(1);
}

function formatName(text) {
  return String(text).split("-").map(capitalize).join(" ");
}

function randomItem(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffleOptions(items) {
  return [...items].sort(() => Math.random() - 0.5);
}
