import { DataTable, When } from '@cucumber/cucumber';
import * as negativeScenario from '../pages/booking/tokenGenerationwithInvaildCreds.page';

When('I attempt to generate a token with invalid credentials username {string} and password {string}', async function (username: string, password: string) { 
    await negativeScenario.generateTokenWithInvalidCreds(username, password);
}
);