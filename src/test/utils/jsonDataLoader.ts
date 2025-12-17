import fs from 'fs';
import path from 'path';
import { bookingPayload } from './bookingPayload.type';

export const loadBookingDataFromFile = (
  fileName: string
): bookingPayload[] => {
  const filePath = path.join(
    process.cwd(),
    'src','test',
    'test-data',
    fileName
  );

  if (!fs.existsSync(filePath)) {
    throw new Error(`Test data file not found: ${fileName}`);
  }

  const rawData = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

  if (!rawData.bookings || !Array.isArray(rawData.bookings)) {
    throw new Error(`Invalid format in ${fileName}`);
  }

  return rawData.bookings;
};
