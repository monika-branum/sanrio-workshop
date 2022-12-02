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

// add event listener to submit button
form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    // match grabbed data with associated name attribute
    const name = data.get('name');
    const contact = data.get('contact');
    const clubId = data.get('club-id');

    // get createMember()
    await createMember({
        name: name,
        contactInfo: contact,
        club_id: clubId,
    });
});
