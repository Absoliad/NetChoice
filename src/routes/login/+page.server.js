/** @type {import('./$types').PageServerLoad} */
import { redirect } from '@sveltejs/kit';
import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';
import login  from '$lib/data/user.json';

export async function load() {

    return {
        title : 'Page de connexion',
        content : 'Voici le content' 
        
    };
};

export const actions = {
	default: async ({ request, cookies }) => {
		const data = await request.formData();
        const username = data.get('username');
        const password = data.get('password');
        console.log(JWT_SECRET);
        let i = 0;
        console.log(username);
        console.log(password);
        if (username === '' || password === '') {
            console.log('Veuillez remplir tous les champs');
            return;
        }

        
        while (login.users[i].name !== username && i < login.users.length) {
            i++;
        }
        if (login.users[i].password === password) {
            const rjwt = jwt.sign (
                {
                    id: login.users[i].id,
                    username: login.users[i].name
                }, 
                JWT_SECRET, 
                {expiresIn: '3h'}
            );
            cookies.set('connected', rjwt, { path : '/'});
            console.log('Connexion réussie');
            throw redirect(303, '/main');
            
        } else {
            console.log('Connexion échouée');
        }
	}
};