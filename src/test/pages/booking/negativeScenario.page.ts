import { spec } from 'pactum';
import { bookingPayload } from '../../utils/bookingPayload.type';
import { getBookingId } from '../../utils/context.utils';
import { BASE_URL } from '../../config/config';

 let lastSpec: any;


export const updateWithoutToken = async(payload: bookingPayload) =>{
    const bookingID = getBookingId();
    lastSpec = spec()
    .put(`${BASE_URL}/booking/${bookingID}`)
    .withHeaders('Content-Type', 'application/json')
    .withHeaders('Accept', 'application/json')
    .withJson(payload)

}

export const validateStatus = async(status: number) =>{
    lastSpec.expectStatus(status);
}