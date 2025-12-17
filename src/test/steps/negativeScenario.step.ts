import { When, Then, DataTable } from '@cucumber/cucumber';
import * as negativeScenario from '../pages/booking/negativeScenario.page';
import mapDataTableToBooking from '../utils/dataMapper.utils';

When('I try to update the booking without token', async (table: DataTable) =>{
    const payload = mapDataTableToBooking(table.rowsHash());
    await negativeScenario.updateWithoutToken(payload);
});

Then('the response status should be {int}', async (status: number) =>{
    await negativeScenario.validateStatus(status);
});