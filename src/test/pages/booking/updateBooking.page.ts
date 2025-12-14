import pactum from 'pactum';
import { getToken } from '../../utils/context.utils';
import { bookingSchema } from '../../schemas/booking.schema';
import assert from 'assert';

export const putRequest = async (ID: number, title: string, body: string) =>{
    const payload ={
        title: title,
        body: body
    }

    const res = await pactum.spec()
    .put(`https://jsonplaceholder.typicode.com/posts/${ID}`)
    .withHeaders("Content-Type", "application/json")
    .withHeaders("Accept", "application/json")
    .withJson(payload)
    .expectStatus(200)
    .expectJsonLike({
        title: title,
        body: body
    })
    .toss();

    if(res.body.title !== title){
        throw new Error(`Expected title ${title} but got ${res.body.title}`);
    }
      if (res.body.body !== body) {
    throw new Error(`Expected body ${body} but got ${res.body.body}`);
  }
console.log(res.body);
  return res.body
}


export const fakeget = async ( id: number, title: string, dueDate: string, completed: boolean) =>{

    const payload = {
        title: title,
        dueDate: dueDate,
        completed: completed
    }

    const res = await pactum.spec()
    .put(`https://fakerestapi.azurewebsites.net/api/v1/Activities/${id}`)
    .withHeaders('Content-Type', 'application/json')
    .withHeaders('Accept', 'application/json')
    .withJson(payload)
    .expectStatus(200)
    .expectJsonLike({
        title: title,
        dueDate: dueDate,
        completed: completed
    })
    .toss();

    if(res.body.title !== title) {
        throw new Error(`Expected title ${title} but got ${res.body.title}`);
    }

    if(res.body.dueDate !== dueDate) {
        throw new Error(`Expected dueDaete ${dueDate} but got ${res.body.dueDate}`);
    }

    console.log(res.body)
    return res.body;
}

export const herokuappput = async (id: number, payload: {
    firstname: string,
    lastname: string,
    totalprice: number,
    depositpaid: boolean,
    bookingdates: {
        checkin: string,
        checkout: string
    },
    additionalneeds: string
}) => {
    const token = await getToken(); // get the token properly

  if (!token) {
    throw new Error('Failed to create token. Check credentials or auth endpoint.');
  }

    const res = await pactum.spec()
    .put(`https://restful-booker.herokuapp.com/booking/${id}`)
    .withHeaders('Content-Type', 'application/json')
    .withHeaders('Accept', 'application/json')
    .withHeaders('Cookie', `token=${token}`) // correct usage for restful-booker
    .withJson(payload)
    .expectStatus(200)
    .expectJsonSchema(bookingSchema)
    .expectJsonLike({
        firstname: payload.firstname,
        lastname: payload.lastname,
        totalprice: payload.totalprice,
        depositpaid: payload.depositpaid,
        bookingdates: payload.bookingdates,
        additionalneeds: payload.additionalneeds
    })
    .toss();
    console.log(res.body);
    }






export const updatePostWithToken = async (
  id: number,
  payload: {
    firstname: string;
    lastname: string;
    totalprice: number;
    depositpaid: boolean;
    bookingdates: {
      checkin: string;
      checkout: string;
    };
    additionalneeds: string;
  }
) => {
  const token = await getToken(); // get the token properly

  if (!token) {
    throw new Error('Failed to create token. Check credentials or auth endpoint.');
  }

  const res = await pactum.spec()
    .put(`https://restful-booker.herokuapp.com/booking/${id}`)
    .withHeaders('Content-Type', 'application/json')
    .withHeaders('Accept', 'application/json')
    .withHeaders('Cookie', `token=${token}`) // correct usage for restful-booker
    .withJson(payload)
    .expectStatus(200)
    .expectJsonLike(payload)
    .toss();

  console.log(res.body);

  // fixed typo and do a real assert
  assert.strictEqual(
    res.body.firstname,
    payload.firstname,
    `Expected firstname ${payload.firstname} but got ${res.body.firstname}`
  );

  console.log(res.body);

  return res.body;
};


export const partialUpdate = async( id: number, payload: {
    firstname: string,
    lastname: string
}) => {
    const token = await getToken();

    const res = await pactum.spec()
    .patch(`https://restful-booker.herokuapp.com/booking/${id}`)
    .withHeaders('Content-Type', 'application/json')
    .withHeaders('Accept', 'application/json')
    .withHeaders('cookie', `token=${token}`)
    .withJson(payload)
    .expectStatus(200)
    .expectJsonLike({
        firstname: payload.firstname,
        lastname: payload.lastname
    })
    .toss();
    
    if(res.body.firstname !== payload.firstname) {
        throw new Error(`Expected firstname ${payload.firstname} but got ${res.body.firstname}`);
    }    

    console.log(res.body);
    return res.body;

}