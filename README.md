# PokeVerse

PokeVerse is a colorful interactive Pokemon website built with HTML, CSS, and JavaScript. Users can search Pokemon, inspect details, browse loaded Pokemon, learn type and region basics, save favorites, and discover playful easter eggs.

## Features

- Interactive homepage with animated Pokemon artwork
- Trainer dashboard with daily missions, a surprise Pokemon spotlight, and learning portals
- Pokemon search by name or ID
- Random Pokemon and mystery encounter buttons
- Browseable Pokedex list with filtering
- Detail profile with official artwork, type badges, description, abilities, height, weight, base XP, stats, moves, and evolution chain
- Compare tool for viewing two Pokemon side by side
- Favorites saved in browser `localStorage`
- Type guide, region guide, detailed regions page, and trainer academy sections
- Dedicated Pokeballs page covering ball types, capture strategy, and special cases
- Dedicated theories page for Pokemon lore, mysteries, and fan ideas
- Fun Lab with random team building, silhouette guessing, and a type quiz easter egg
- Responsive layout for desktop and mobile

## Project Structure

```text
PokeVerse/
+-- css/
|   +-- style.css
+-- html/
|   +-- index.html
|   +-- home.html
|   +-- pokemon.html
|   +-- pokeballs.html
|   +-- regions.html
|   +-- theories.html
+-- images/
|   +-- regions-overview.png
+-- js/
|   +-- app.js
+-- assets
+-- README.md
```

## Getting Started

No build step is required.

Open `html/index.html` in a browser to use the main website.

The app fetches live data from [PokeAPI](https://pokeapi.co/), so an internet connection is required for search, details, sprites, and evolution data.

## Main Files

- `html/index.html` - Main PokeVerse website
- `html/home.html` - Redirects into the Pokedex section
- `html/pokemon.html` - Redirects into the Pokedex section
- `html/pokeballs.html` - Learning page for Pokeballs and capture strategy
- `html/regions.html` - Detailed region guide page
- `html/theories.html` - Pokemon theory and lore learning page
- `images/regions-overview.png` - Generated region overview artwork
- `css/style.css` - Layout, responsive design, animations, and visual system
- `js/app.js` - PokeAPI requests, rendering, search, favorites, regions, type guide, and easter eggs

## Easter Eggs

- Random Team Builder creates a surprise team of six Pokemon.
- Who's That Pokemon keeps the silhouette hidden until users guess correctly.
- Type Quiz shows Pokemon artwork and asks users to identify one of its types.

## Future Ideas

- Add dedicated pages for moves, abilities, characters, and episodes
- Add generation filters
- Add battle weakness/resistance charts
- Add offline placeholder data for when the API is unavailable
