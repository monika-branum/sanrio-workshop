/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
// import { deleteMember, getFanClubs } from '.fetch-utils.js';
import { renderFanClub } from './render-utils.js';
import { getFanClubs } from './fetch-utils.js';
/* Get DOM Elements */
const fanClubsList = document.querySelector('.fan-clubs-list');

/* State */

/* Events */
window.addEventListener('load', async () => {
    await fetchAndDisplaySanrioClubs();
});
/* Display Functions */

async function fetchAndDisplaySanrioClubs() {
    fanClubsList.textContent = '';

    const fanClubs = await getFanClubs();
    for (let club of fanClubs) {
        // console.log('club', club);
        const clubEl = renderFanClub(club);
        const membersEl = document.createElement('ul');
        for (let member of club.members) {
            const memberEl = document.createElement('li');
            memberEl.textContent = `{member.name} : {member.contactInfo}`;
            //add delete event listener within the function
            membersEl.append(memberEl);
        }
        clubEl.append(membersEl);
        fanClubsList.append(clubEl);
    }
}
