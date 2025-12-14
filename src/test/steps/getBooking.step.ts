import { assert } from 'console';
import * as get from '../pages/booking/getBooking.page.';
import { DataTable, Then } from '@cucumber/cucumber';

Then('i get all posts', async () => {
    await get.getAllPosts();
})

Then('i get post by ID {int}', async(int: number) => {
    await get.getPostByID(int);
})

Then('the title of post ID {int} should be {string}', async (int: number, string: string) => {
    await get.assertPostTitle(int, string);
})

Then('i get the title of post with id {int} and it should be equal to {string}', async (int: number, expectedTitle: string) => {
    await get.assertTitles(int, expectedTitle);
});

Then('I get Booking details by ID {int} contains data', async (id: number, table: DataTable) => {
    const map = table.rowsHash();
    const payload = {
        firstname: map.firstname ?? '',
        lastname: map.lastname ?? ''
    }
    await get.getBookingByID(id, payload);
});