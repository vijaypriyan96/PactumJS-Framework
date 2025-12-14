import pactum from 'pactum';
import { getToken } from '../../utils/context.utils';

export const deleteRequest = async (id: number) => {
    const token = getToken();

    if(!token) {
        throw new Error('no token found')
    }

    const res = await pactum.spec()
    .delete(`https://restful-booker.herokuapp.com/booking/${id}`)
    .withHeaders('Content-Type', 'application/json')
    .withHeaders('Accept', 'application/json')
    .withHeaders('Cookie', `token=${token}`)
    .toss();

    if(![200, 201, 204].includes(res.statusCode)){
        throw new Error(`Expected status code 200, 201 or 204 but got ${res.statusCode}`);
    }

        console.log(res.body)
}