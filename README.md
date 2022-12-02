# Week 04 From Scratch - Workshop Organizer

## Project Planning

### Wireframe

![wireframe](./assets/wireframe%20workshop.clip)

### Supabase Tables

books clubs:

-   id (int)
-   name (varchar)

members:

-   id (int)
-   name (varchar)
-   contact info
-   club_id (foreign key relationship)

### HTML

Total of 3 pages:

-   auth (given)
-   bookclubs (home page)
-   create (/create)
    -   form with: name, contact, select dropdown with different club names

## Workflow

1.  -   Database Setup Supabase Tables

2.  Book Clubs Page (Landing Page)

-   getBookClubs function to fetch all of the book clubs and their members)
-   render function that displays the clubs
-   loop through clubs and display

3. Create Page (/create)

-   `form` with:
    -   inputs for name, contact
    -   placeholder select dropdown
-   get our clubs (`getBookClubs`) and dynamically add `option` to select
-   Add createMember function to fetch-utils
-   Add even for form submit to grab the form data and sending it to Supabase (calling createMember function)

4. Delete Member (book clubs page)

-   add deleteMember function that takes in the id of the member in fetch-utils
-   make member element clickable and delete on click

## Rubric

-   [] Supabase tables properly setup (submit a screenshot with your submission) 2
-   [] User sees a list of workshops with participants on `/workshops` 3
-   [] User sees a DYNAMIC dropdown of workshops on `/create` 3
-   [] User can add a partipant to a workshop 3
-   [] User can remove a participant from a workshop 3
-   [] ASYNC: `getWorkshops()` : get all workshops with their participants in supabase. 2
-   [] ASYNC: `createParticipant(participant)` : create participant in supabase and attach it to a workshop 2
-   [] ASYNC: `deleteParticipant(id)` : delete a participant in supabase 2
