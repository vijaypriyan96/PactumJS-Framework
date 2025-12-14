import pactum from 'pactum';

export const createToken = async (username = 'admin', password = 'password123') => {
    const res = await pactum.spec()
    .post('https://restful-booker.herokuapp.com/auth')
    .withHeaders('content-type', 'application/json')
    .withJson({ username, password })    // <--- important: send JSON body
    .expectStatus(200)
    .toss();

    const token = res.body?.token;
    if(!token) {
        throw new Error('Token is not generated')
    }
    return token;
}

