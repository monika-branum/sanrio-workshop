# Week 04, Block B

Total of 3 pages:

-   auth (given)
-   bookclubs page (home page)

---

Endpoints:

-   Sign in / Sign up page (/auth)
-   bookclubs page (/)
-   create page (/create)

---

## foreign key

We have two tables, but want to connect the members with the books clubs id. So we use a foreign key.
connect the club id with the members id

> Each member has a pointer to that row in the book clubs table - Julie

---

## Setting Up Supabase Tables

Bookclubs Table

-   RLS Policy, Enable read access for all users
    Directions for setting up RLS policy:
-   Get started quickly
-   Enable read access to everyone (anyone can see bookclubs)
-   Select (same as read)
-   Review / Save

Members Table - To get foreign key set up:

-   edit club_id
-   Add foreign key relation
-   Search for bookclubs table in dropdown

Members Table Policies

-   Select, Delete, Insert

New Policy example:

-   Get started quickly
-   Enable insert access for authenticated users only
-   Change it to delete
-   Change to delete
-   put true

---

## fetch-utils.js

Create a ternary error handling function (place at bottom of the data functions)

```
function checkError(response) {
    return response.error ? console.error(error) : response.data
}
```

```
export async function getBooksClubs() {
    // give me every property for book clubs, and give me every club member who has this club as a foreign key
    const response = await client.from('book_clubs').select('*, members(*)');

return checkError(response)
}
```

## render-utils

```
export function renderBookClub(clubObject) {
    const clubEl = document.createElement('div');
    const nameEl = documnet.createElement('h3');

    nameEl.textContent = clubObject.name;

    clubEl.append(nameEl);

    return clubEl;

}

```

## app.js

Loop through clubs that we're getting back from Supabase and display them

```
// Get DOM Elements
const clubListEl = document.querySelector('.book-clubs-list');

```

```
// Event Listener
window.addEventListener('load', async () => {
    await fetchAndDisplayBookClubs();
})

```

```
// Display Functions
async function fetchAndDisplayClubs() {
    // clear out text content of club list
    clubListEl.textContent = '';

    // get all book clubs
    const bookclubs = await getBookClubs();
    const membersEl = document.createElement('ul');

    for (let club of bookclubs) {
        const clubEl = renderBookClub(club);
        for (let member of club.members) {
            const memberEl = document.createElement('li');
            memberEl.textContent = `${member.name}: ${member.contact}`;
            membersEl.append(memberEl);
        }
        clubEl.append(membersEl);
        clubListEl.append(clubEl);
    }

}
```

More info on appending:
Each book club can have multiple members, so we're appending that list to each club individually

Then we're appending those members to each club list.

---

## /create, index.html

## create.js

```

const selectEl = document.querySelect('select')
const form = document.querySelector('form')


window.addEventListener('load', async () => {
    const clubs = await getBookClubs();

    clubOption.textContent = club.name;
    clubOption.value = club.id;

    selectEl.append(clubOption);
}
```

## fetch-utils

```
export async function createMember(member) {
    const response = await.client.from('members').insert(member);

    return checkError(response);
}
```

## create.js

```
// form event listener

form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const data = new FormData(form);
    // match grabbed data with associated name attr
    const name = data.get('name');
    const contact = data.get('contact');
    const clubId = date.get('club-id');

    // create member function
    await createMember ({
        name: name,
        contact_info: contact,
        club_id: clubId
    });
});

```

---

## fetch

```
export async function deleteMember(memberId) {
    const response = await client.from('members').delete().match({ id: memberId}).single();

    return checkError(response);
}

```

Notes for above:
id against member in the table against the member id that we're giving it

---

> await client.from('book*clubs').select('*, member(\_)')? - Allie

-   it's going to grab everything from bookclubs
-   join on the members to that book clubs
-   and give me all of the columns from the members table as well

-   Julie

---

## app.js - add to fetchAndDisplayClubs()

```
// Display Functions
async function fetchAndDisplayClubs() {
    // clear out text content of club list
    clubListEl.textContent = '';

    // get all book clubs
    const bookclubs = await getBookClubs();
    const membersEl = document.createElement('ul');

    for (let club of bookclubs) {
        const clubEl = renderBookClub(club);
        for (let member of club.members) {
            const memberEl = document.createElement('li');
            memberEl.textContent = `${member.name}: ${member.contact}`;

            // NEW ADDITION
            memberEl.addEventListener('click', async () => {
                await deleteMember(member.id);
                fetchAndDisplayBookClubs();
            })
            // END OF NEW ADDITION

            membersEl.append(memberEl);
        }
        clubEl.append(membersEl);
        clubListEl.append(clubEl);
    }

}

```

---

-   Turn in screenshot of Supabase tables
