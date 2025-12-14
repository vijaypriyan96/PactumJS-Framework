import { Before, After } from '@cucumber/cucumber';
import { createToken } from '../pages/auth/auth.page';
import { setToken, clearToken } from '../utils/context.utils';

Before(async function () {
  // create token once before each scenario
  const token = await createToken();
  setToken(token);
});

// optional: clear token after scenario (keeps memory clean)
After(function () {
  clearToken();
});
