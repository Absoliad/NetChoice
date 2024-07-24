/** @type {import('./$types').PageServerLoad} */
export async function load() {
    return {
        content : 'Voici le content', 
        title : 'Home'
    };
};