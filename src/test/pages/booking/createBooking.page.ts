import pactum from 'pactum';
import { createBookingResponseSchema } from '../../schemas/booking.schema';

export const herokuapp = async (payload: {
  firstname: string, 
  lastname: string,
  totalprice: number,
  depositpaid: boolean,
  bookingdates: {
    checkin: string,
    checkout: string
  },
  additionalneeds: string
}) =>{
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

export const createBookingExpectingStatus = async (expectedStatus: number, payload: {
  firstname: string, 
  lastname: string,
  totalprice: number,
  depositpaid: boolean,
  bookingdates: {
    checkin: string,
    checkout: string
  },
  additionalneeds: string
}) =>{
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


