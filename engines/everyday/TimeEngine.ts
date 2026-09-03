export interface TimeShift {
  id: string;
  day: string;
  startTime: string; // "HH:MM"
  endTime: string;   // "HH:MM"
  breakMinutes: number;
}

export interface TimeOutputs {
  totalMinutes: number;
  totalHoursFormatted: string; // "XXh YYm"
  decimalHours: number;        // XX.YY
  grossPay: number;
}

export function calculateWorkHours(shifts: TimeShift[], hourlyRate: number = 0): TimeOutputs {
  let totalMinutes = 0;

  for (const shift of shifts) {
    if (!shift.startTime || !shift.endTime) continue;

    const [startH, startM] = shift.startTime.split(':').map(Number);
    const [endH, endM] = shift.endTime.split(':').map(Number);

    let startTotal = startH * 60 + startM;
    let endTotal = endH * 60 + endM;

    // Handle overnight shifts
    if (endTotal < startTotal) {
      endTotal += 24 * 60; 
    }

    let shiftDuration = endTotal - startTotal;
    shiftDuration -= (shift.breakMinutes || 0);

    if (shiftDuration > 0) {
      totalMinutes += shiftDuration;
    }
  }

  const hours = Math.floor(totalMinutes / 60);
  const minutes = totalMinutes % 60;
  const decimalHours = totalMinutes / 60;
  
  return {
    totalMinutes,
    totalHoursFormatted: $hours + 'h ' + $minutes + 'm',
    decimalHours: Number(decimalHours.toFixed(2)),
    grossPay: Number((decimalHours * hourlyRate).toFixed(2))
  };
}
