import { createMember, getFanClubs } from '../fetch-utils.js';

const selectEl = document.querySelector('select');
const form = document.querySelector('form');

window.addEventListener('load', async () => {
    const clubs = await getFanClubs();

    for (let club of clubs) {
        const clubOption = document.createElement('option');

        clubOption.textContent = club.fanClub;
        clubOption.value = club.id;

        selectEl.append(clubOption);
    }
});
