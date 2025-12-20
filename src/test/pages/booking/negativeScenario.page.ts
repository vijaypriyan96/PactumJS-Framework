import { spec } from 'pactum';
import { bookingPayload } from '../../utils/bookingPayload.type';
import { getBookingId } from '../../utils/context.utils';
import { BASE_URL } from '../../config/config';
import { setLastSpec, getLastSpec } from '../../utils/apiContext.utils';


export const updateWithoutToken = async(payload: bookingPayload) =>{
    const bookingID = getBookingId();
    const res = spec()
    .put(`${BASE_URL}/booking/${bookingID}`)
    .withHeaders('Content-Type', 'application/json')
    .withHeaders('Accept', 'application/json')
    .withJson(payload)
    setLastSpec(res);

}

export const validateStatus = async(status: number) =>{
     await getLastSpec().expectStatus(status).toss();
}