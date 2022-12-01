export function renderFanClub(clubObject) {
    const clubEl = document.createElement('div');
    const clubName = document.createElement('h3');

    // add club name
    clubName.textContent = clubObject.fanClub;

    // append
    clubEl.append(clubName);

    // return
    return clubEl;
}
