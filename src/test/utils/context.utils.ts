// small in-memory context for the test run (per Node process)
let token: string | null = null;
let bookingId: number | null = null;
let bookingSnapshot: Record<string, any> | null = null;


export const setToken = (t: string) => { token = t; };
export const getToken = (): string | null => token;
export const clearToken = () => { token = null; };


export const setBookingId = (id: number) => { bookingId = id; };
export const getBookingId = (): number | null => bookingId;
export const clearBookingId = () => { bookingId = null; };

export const setBookingSnapshot = (obj: Record<string, any>) => { bookingSnapshot = obj; };
export const getBookingSnapshot = (): Record<string, any> | null => bookingSnapshot;
export const clearBookingSnapshot = () => { bookingSnapshot = null; };

