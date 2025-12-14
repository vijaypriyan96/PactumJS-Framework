import pactum from 'pactum';
import assert from 'assert';

export const getAllPosts = async () =>{
    const res = await pactum.spec()
    .get("https://jsonplaceholder.typicode.com/posts")
    .withHeaders("Accept", "application/json")
    .expectStatus(200);
    console.log(res);
}


export const getPostByID = async (ID: number) => {
    const res = await pactum.spec()
    .get(`https://jsonplaceholder.typicode.com/posts/${ID}`)
    .withHeaders("Accept", "application/json")
    .expectStatus(200);
    console.log(res.body);
}

export const assertPostTitle = async (ID: number, expectedTitle: string) => {
    const res = await pactum.spec()
    .get(`https://jsonplaceholder.typicode.com/posts/${ID}`)
    .withHeaders("Accept", "application/json")
    .expectStatus(200)
    .expectJsonLike({
        title: expectedTitle
    });
   assert.strictEqual(
    res.body.title,
    expectedTitle,
    `Expected title "${expectedTitle}" but got "${res.body.title}"`
  );


}

export const assertTitles = async (int: number, expectedTitle: string) => {
    const res = await pactum.spec()
    .get(`https://fakerestapi.azurewebsites.net/api/v1/Activities/${int}`)
    .withHeaders('Content-Type', 'application/json')
    .expectStatus(200)
    .expectJsonLike({
        title: expectedTitle
    });

    assert.strictEqual(
        res.body.title,
        expectedTitle,
        `Expected title "${expectedTitle}" but got "${res.body.title}"`
    )


}


export const getBookingByID = async (id: number,
    payload: {
        firstname: string,
        lastname: string,
    }) =>{
        const res = await pactum.spec()
        .get(`https://restful-booker.herokuapp.com/booking/${id}`)
        .withHeaders('Content-Type', 'application/json')
        .withHeaders('Accept', 'application/json')
        .expectStatus(200)
        .expectJsonLike(payload);

        console.log(res.body);

        assert.strictEqual(res.body.firstname, payload.firstname, `Expected firstname ${payload.firstname} but got ${res.body.firstname}`);
        return res.body;
    } 