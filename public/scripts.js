document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pokemon-form');
    const pokemonList = document.getElementById('pokemon-list');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

        // Gather form data and send it to the server
        const formData = new FormData(form);
        const response = await fetch('/api/pokemon', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
            // Clear form and update the list of pokémons
            form.reset();
            fetchPokemons();
        }
    });

    async function fetchPokemons() {
        const response = await fetch('/api/pokemon');
        const data = await response.json();

        // Display the list of pokémons
        pokemonList.innerHTML = ''; // Clear previous list
        data.forEach(pokemon => {
            const pokemonItem = document.createElement('div');
            // Create HTML structure for displaying pokémon data
            // Append it to pokemonList
            pokemonList.appendChild(pokemonItem);
        });
    }

    fetchPokemons();
});
