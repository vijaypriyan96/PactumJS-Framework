import {DataTable, When } from '@cucumber/cucumber';
import * as booking from '../pages/booking/createBooking.page';
import mapDataTableToBooking from '../utils/dataMapper.utils';


When('I create a new booking in the herokuapp', async (table: DataTable) =>{
   const payload = mapDataTableToBooking(table.rowsHash());
    await booking.herokuapp(payload);
})


When('I try to create a booking with invalid totalprice expecting status {int}', async (expectedStatus: number, table: DataTable) => {
    const payload = mapDataTableToBooking(table.rowsHash());
    await booking.createBookingExpectingStatus(expectedStatus, payload);

});