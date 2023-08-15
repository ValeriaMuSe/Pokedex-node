document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('pokemon-form');
    const pokemonList = document.getElementById('pokemon-list');

    form.addEventListener('submit', async (event) => {
        event.preventDefault();

 
        const formData = new FormData(form);
        const response = await fetch('/api/pokemon', {
            method: 'POST',
            body: formData,
        });

        if (response.ok) {
        
            form.reset();
            fetchPokemons();
        }
    });

    async function fetchPokemons() {
        const response = await fetch('/api/pokemon');
        const data = await response.json();


        pokemonList.innerHTML = ''; 
        data.forEach(pokemon => {
            const pokemonItem = document.createElement('div');
         
            pokemonList.appendChild(pokemonItem);
        });
    }

    fetchPokemons();
});
