import { bookingPayload } from './bookingPayload.type'; // adjust if needed

export default function mapDataTableToBooking(map: any): bookingPayload {
  return {
    firstname: map.firstname ?? '',
    lastname: map.lastname ?? '',
    totalprice: Number(map.totalprice ?? 0),
    depositpaid: (map.depositpaid ?? 'false').toLowerCase() === 'true',
    bookingdates: {
      checkin: map.checkin ?? '',
      checkout: map.checkout ?? ''
    },
    additionalneeds: map.additionalneeds ?? ''
  };
}