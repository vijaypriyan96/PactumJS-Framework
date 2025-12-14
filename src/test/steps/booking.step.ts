import { When, Then, DataTable } from '@cucumber/cucumber';
import * as heroku from '../pages/booking/booking.page';
import mapDataTableToBooking from '../utils/dataMapper.utils';



When('I create a user and then create a post for that user', async function (table: DataTable) {

  const payload = mapDataTableToBooking(table.rowsHash());
  await heroku.createBooking(payload);
  this.createdPayload = payload;
});

Then('I fetch the booking and it should match the created data', async function () {
    await heroku.getBooking(this.createdPayload);    
});

When('I update the booking with:', async function(table: DataTable) {
    const payload = mapDataTableToBooking(table.rowsHash());
    await heroku.putBooking(payload);
    this.updatedBooking = payload;
})

When('I partially update the booking firstname {string} and lastname {string}', async function (firstname: string, lastname: string) {
    await heroku.patchBooking(firstname, lastname);
})

When('I delete the booking with ID', async function () {
    await heroku.deleteBooking();
})

Then('the booking should reflect the update', async function (){
    await heroku.validatePutRequest(this.updatedBooking);
})

Then('fetching the booking should return {int}', async function (status: number) {
    await heroku.validateDeleted(status);
})