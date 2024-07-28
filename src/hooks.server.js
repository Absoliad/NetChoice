import { redirect } from '@sveltejs/kit';
import { JWT_SECRET } from '$env/static/private';
import jwt from 'jsonwebtoken';

export async function handle({ event, resolve}) {
	if (!event.url.pathname.startsWith('/login')){
		const connected = event.cookies.get('connected');
		console.log(connected);
		if (!connected) {
			throw redirect(303, '/login');
		} else {
			try {
				
				const decode = jwt.verify(connected,JWT_SECRET);
				event.locals.info = 
					{
						id: decode.id,
						username: decode.username
					}; 
			} catch (err) {
				console.log('test');
				console.log(err);
				event.cookies.delete('connected', { path : '/'});
				throw redirect(303, '/login');
			}
		}
	}

    return await resolve (event);

}
