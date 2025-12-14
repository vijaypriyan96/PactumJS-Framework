export type bookingPayload = {
    firstname: string, 
    lastname: string,
    totalprice: number | string,
    depositpaid: boolean,
    bookingdates: {
        checkin: string,
        checkout: string
    },
    additionalneeds: string
}
