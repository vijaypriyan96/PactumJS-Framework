import { DataTable, When } from '@cucumber/cucumber';
import * as put from '../pages/booking/updateBooking.page';


When('I update post ID {int} with title {string} and body {string}', async (int: number, title: string, body: string) => {

    await put.putRequest(int, title, body);
}
);


When('I update post id {int} with title {string} dueDate {string} and completed {string}', async (id: number, title: string, dueDate: string, completed: string) => {
    const completedBool = completed.toLowerCase() === "true";

    await put.fakeget(id, title, dueDate, completedBool);
})

When('I update Booking details of id {int} with following details', async (id: number, table: DataTable)=>{
    const map = table.rowsHash();


    const payload = {
        firstname: map.firstname ?? '',
        lastname: map.lastname ?? '',
        totalprice: Number(map.totalprice ?? '0'),
        depositpaid: (map.depositpaid ?? 'false').toLowerCase() === 'true',
        bookingdates: {
            checkin: map.checkin ?? '',
            checkout: map.checkout ?? ''
        },
        additionalneeds: map.additionalneeds ?? ''
    }
    await put.herokuappput(id, payload);
})

When('I update the stored booking of id {int} with firstname {string} and lastname {string}', async (id: number, firstname: string, lastname: string) => {
  await put.updatePostWithToken(id,{
    firstname,
    lastname,
    totalprice: 222,
    depositpaid: false,
    bookingdates: { checkin: '2025-12-01', checkout: '2025-12-02' },
    additionalneeds: 'None'
  });
});

When('I partially update booking details with id {int} with details', async (id: number, table: DataTable) => {
    const map = table.rowsHash();
    const payload = {
        firstname: map.firstname ?? '',
        lastname: map.lastname ?? ''
    }

    await put.partialUpdate(id, payload);
})