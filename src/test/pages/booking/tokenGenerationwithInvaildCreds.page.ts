import { spec } from 'pactum';
import { setLastSpec } from '../../utils/apiContext.utils';


export const generateTokenWithInvalidCreds = async (username: string, password: string) => {
     const res =  spec()
     .post('https://restful-booker.herokuapp.com/auth')
    .withHeaders('content-type', 'application/json')
    .withJson({ username, password })    // <--- important: send JSON body

    setLastSpec(res);
}