/* Imports */
// this will check if we have a user and set signout link if it exists
import './auth/user.js';
import { deleteMember, getFanClubs } from './fetch-utils.js';
import { renderFanClub } from './render-utils.js';

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
        const clubEl = renderFanClub(club);
        const membersEl = document.createElement('ul');

        for (let member of club.sanrioMembers) {
            const memberEl = document.createElement('li');
            memberEl.textContent = `${member.name} : ${member.contactInfo}`;
            //add delete event listener within the function
            memberEl.addEventListener('click', async () => {
                await deleteMember(member.id);
                fetchAndDisplaySanrioClubs();
            });

            membersEl.append(memberEl);
        }
        clubEl.append(membersEl);
        fanClubsList.append(clubEl);
    }
}
