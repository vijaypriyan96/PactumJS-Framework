import { When } from '@cucumber/cucumber';
import * as deletes from '../pages/booking/deleteBooking.page';

When('I delete booking with id {int}', async (id: number) => {
    await deletes.deleteRequest(id);
});