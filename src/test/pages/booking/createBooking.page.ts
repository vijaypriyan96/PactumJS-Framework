import pactum from 'pactum';
import { createBookingResponseSchema } from '../../schemas/booking.schema';
import { bookingPayload } from '../../utils/bookingPayload.type';

export const herokuapp = async (payload: bookingPayload) =>{
     const res = await pactum.spec()
     .post('https://restful-booker.herokuapp.com/booking')
     .withHeaders('Content-Type', 'application/json')
     .withHeaders('Accept', 'application/json')
     .withJson(payload)
     .expectStatus(200)
     .expectJsonSchema(createBookingResponseSchema)
    //  .expectJsonLike({booking:payload})
     .toss();


     console.log(res.body);
     return res.body;
}

export const createBookingExpectingStatus = async (expectedStatus: number, payload: bookingPayload) =>{
     const res = await pactum.spec()
     .post('https://restful-booker.herokuapp.com/booking')
     .withHeaders('Content-Type', 'application/json')
     .withHeaders('Accept', 'application/json')
     .withJson(payload)
     .expectStatus(expectedStatus)
    //  .expectJsonLike({booking:payload})
     .toss();


     console.log(res.body);
     return res.body;
}


