import {DataTable, When } from '@cucumber/cucumber';
import * as booking from '../pages/booking/createBooking.page';


When('I create a new booking in the herokuapp', async (table: DataTable) =>{
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
    await booking.herokuapp(payload);
})


When('I try to create a booking with invalid totalprice expecting status {int}', async (expectedStatus: number, table: DataTable) => {
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
    await booking.createBookingExpectingStatus(expectedStatus, payload);

});