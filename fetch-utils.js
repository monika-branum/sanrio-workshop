const SUPABASE_URL = 'https://giwptggnnkyngbvntavn.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imdpd3B0Z2dubmt5bmdidm50YXZuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxMDg1MDUsImV4cCI6MTk4MzY4NDUwNX0.IpqZ1fOasMiRTSsQIkHj5BOCwSYQSi4zxsS9Hhx76x0';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
export async function getFanClubs() {
    const response = await client.from('sanrio').select('*, sanrioMembers(*)');
    return checkError(response);
}

export async function createMember(name) {
    const response = await client.from('sanrioMembers').insert(name);
    return checkError(response);
}

function checkError(response) {
    return response.error ? console.error(response.error) : response.data;
}
