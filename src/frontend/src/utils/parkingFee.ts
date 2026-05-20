// Billing rounds up to nearest hour, minimum 1 hour
export function calculateParkingFee(durationMinutes: number, pricePerHour: number): number {
  const billingHours = Math.max(1, Math.ceil(durationMinutes / 60));
  return billingHours * pricePerHour;
}

export function calculateDurationMinutes(startedAt: string, endedAt: string): number {
  const start = new Date(startedAt).getTime();
  const end = new Date(endedAt).getTime();
  return Math.max(0, Math.round((end - start) / 60000));
}
