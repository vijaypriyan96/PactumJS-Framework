export type BookingInputMap = Record<string, string | undefined>;

export function validateBookingInput(map: BookingInputMap) {
  // Required fields (you can adjust this list)
  if (!map.firstname || !map.firstname.trim()) {
    throw new Error('firstname is required');
  }
  if (!map.lastname || !map.lastname.trim()) {
    throw new Error('lastname is required');
  }

  // totalprice must be a valid number if provided
  if (map.totalprice !== undefined) {
    const n = Number(map.totalprice);
    if (Number.isNaN(n)) {
      throw new Error(`totalprice must be a number, but got "${map.totalprice}"`);
    }
  }

  // depositpaid must be "true" or "false" if provided
  if (map.depositpaid !== undefined) {
    const v = map.depositpaid.trim().toLowerCase();
    if (v !== 'true' && v !== 'false') {
      throw new Error(`depositpaid must be "true" or "false", but got "${map.depositpaid}"`);
    }
  }

  // Dates: keep as strings, but ensure non-empty and basic format if present
  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;

  if (map.checkin) {
    const val = map.checkin.trim();
    if (!dateRegex.test(val)) {
      throw new Error(`checkin must be YYYY-MM-DD, but got "${map.checkin}"`);
    }
  }

  if (map.checkout) {
    const val = map.checkout.trim();
    if (!dateRegex.test(val)) {
      throw new Error(`checkout must be YYYY-MM-DD, but got "${map.checkout}"`);
    }
  }
}
