import pactum from 'pactum';
import { setBookingId, getBookingId } from '../../utils/context.utils';
import { getToken } from '../../utils/context.utils';
import { createBookingResponseSchema} from '../../schemas/booking.schema';
import { bookingPayload } from '../../utils/bookingPayload.type';
import { BASE_URL } from '../../config/config';


export const createBooking = async ( payload: bookingPayload) => {
    const res = await pactum.spec()
    .post(`${BASE_URL}/booking`)
    .withHeaders('Content-Type', 'application/json')
    .withHeaders('Accept', 'application/json')
    .withJson(payload)
    .expectStatus(200)  
    .expectJsonSchema(createBookingResponseSchema)
    .toss();
     setBookingId(res.body.bookingid);
     console.log(`Created booking with ID: ${res.body.bookingid}`);
     return res.body.bookingid as number;
    
}


export const getBooking = async (expectedPayload: bookingPayload) => {
    const bookingId = getBookingId();
    console.log(`Retrieving booking with ID: ${bookingId}`);
    const res = await pactum.spec()
    .get(`${BASE_URL}/booking/${bookingId}`)
    .withHeaders('Content-Type', 'application/json')
    .withHeaders('Accept', 'application/json')
    .expectStatus(200)
    .expectJsonLike(expectedPayload)
    .toss();

    console.log(`the booking details for booking id ${bookingId}`)

    console.log(res.body);
}

export const putBooking = async (payload: bookingPayload) => {
    const token = getToken();
    const bookingId = getBookingId();
    const res = await pactum.spec()
    .put(`${BASE_URL}/booking/${bookingId}`)
    .withHeaders('Content-Type', 'application/json')
    .withHeaders('Accept', 'application/json')
    .withHeaders('Cookie', `token=${token}`) // correct usage for restful-booker
    .withJson(payload)
    .expectStatus(200)
    .toss();

    console.log(res.body);
}

export const validatePutRequest = async (expectedPayload: bookingPayload) => {
    const bookingId = getBookingId();
    const res = await pactum.spec()
    .get(`${BASE_URL}/booking/${bookingId}`)
    .withHeaders('Content-Type', 'application/json')
    .withHeaders('Accept', 'application/json')
    .expectStatus(200)
    .expectJsonLike(expectedPayload)
    .toss();
    console.log(res.body);
}

export const patchBooking = async (firstname: string, lastname: string) => {
    const token = getToken();
    const bookingId = getBookingId();
    const res = await pactum.spec()
    .patch(`${BASE_URL}/booking/${bookingId}`)
    .withHeaders('Content-Type', 'application/json')
    .withHeaders('Accept', 'application/json')
    .withHeaders('Cookie', `token=${token}`) // correct usage for restful-booker
    .withJson({
        firstname,
        lastname
    })
    .expectStatus(200)
    .toss();

    console.log(res.body);
}

export const deleteBooking = async () => {
    const token = getToken();
    const bookingId = getBookingId();
    const res = await pactum.spec()
    .delete(`${BASE_URL}/booking/${bookingId}`)
    .withHeaders('Content-Type', 'application/json')
    .withHeaders('Accept', 'application/json')
    .withHeaders('Cookie', `token=${token}`) // correct usage for restful-booker
    .expectStatus(201)
    .toss();

    console.log(`Deleted booking with ID: ${bookingId}`);
    console.log(res.body);


}

export const validateDeleted = async (status: number) => {
    const bookingId = getBookingId();
    const res= await pactum.spec()
    .get(`${BASE_URL}/booking/${bookingId}`)
    .withHeaders('Content-Type', 'application/json')
    .withHeaders('Accept', 'application/json')
    .expectStatus(status)
    .toss();

    console.log(res.body)
}