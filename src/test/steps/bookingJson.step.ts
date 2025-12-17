import { When, Then } from '@cucumber/cucumber';
import { loadBookingDataFromFile } from '../utils/jsonDataLoader';
import * as bookingPage from '../pages/booking/booking.page';

When('I create booking using json file {string}',async function (fileName: string) {
    const bookings = loadBookingDataFromFile(fileName);
    for (const payload of bookings) {
      await bookingPage.createBooking(payload);
    }
  }
);
