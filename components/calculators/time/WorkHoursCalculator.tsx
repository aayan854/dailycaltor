"use client";
import React, { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { useCurrency } from '@/components/providers/CurrencyProvider';
import { calculateWorkHours, TimeShift } from '@/engines/everyday/TimeEngine';
import { Plus, Trash2, Clock } from 'lucide-react';
import { useTranslations } from 'next-intl';

export function WorkHoursCalculator() {
  const t = useTranslations('Calc'); // Ensure 'time' block is added later!
  const { formatAmount } = useCurrency();
  const [hourlyRate, setHourlyRate] = useState<number>(20);
  const [shifts, setShifts] = useState<TimeShift[]>([
    { id: '1', day: 'Monday', startTime: '09:00', endTime: '17:00', breakMinutes: 30 }
  ]);

  const outputs = useMemo(() => calculateWorkHours(shifts, hourlyRate), [shifts, hourlyRate]);

  const addShift = () => {
    setShifts([...shifts, { id: Math.random().toString(), day: 'Day ' + (shifts.length + 1), startTime: '', endTime: '', breakMinutes: 0 }]);
  };

  const removeShift = (id: string) => {
    setShifts(shifts.filter(s => s.id !== id));
  };

  const updateShift = (id: string, field: keyof TimeShift, value: any) => {
    setShifts(shifts.map(s => s.id === id ? { ...s, [field]: value } : s));
  };

  return (
    <div className="grid lg:grid-cols-3 gap-8">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <div className="flex justify-between items-center">
              <div>
                <CardTitle>Work Shifts</CardTitle>
                <CardDescription>Enter your start and end times</CardDescription>
              </div>
              <Button onClick={addShift} size="sm"><Plus className="w-4 h-4 mr-2" /> Add Shift</Button>
            </div>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4 max-h-[500px] overflow-y-auto pr-2">
              {shifts.map((shift, i) => (
                <div key={shift.id} className="grid grid-cols-12 gap-3 items-end bg-muted/20 p-3 rounded-lg border">
                  <div className="col-span-12 sm:col-span-3 space-y-1">
                    <Label className="text-xs text-muted-foreground">Day/Label</Label>
                    <Input value={shift.day} onChange={(e) => updateShift(shift.id, 'day', e.target.value)} />
                  </div>
                  <div className="col-span-4 sm:col-span-3 space-y-1">
                    <Label className="text-xs text-muted-foreground">Start Time</Label>
                    <Input type="time" value={shift.startTime} onChange={(e) => updateShift(shift.id, 'startTime', e.target.value)} />
                  </div>
                  <div className="col-span-4 sm:col-span-3 space-y-1">
                    <Label className="text-xs text-muted-foreground">End Time</Label>
                    <Input type="time" value={shift.endTime} onChange={(e) => updateShift(shift.id, 'endTime', e.target.value)} />
                  </div>
                  <div className="col-span-3 sm:col-span-2 space-y-1">
                    <Label className="text-xs text-muted-foreground">Break (min)</Label>
                    <Input type="number" value={shift.breakMinutes} onChange={(e) => updateShift(shift.id, 'breakMinutes', parseInt(e.target.value) || 0)} />
                  </div>
                  <div className="col-span-1 sm:col-span-1 pb-1 flex justify-end">
                    <Button variant="ghost" size="icon" onClick={() => removeShift(shift.id)} className="text-red-500 h-9 w-9">
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              ))}
              {shifts.length === 0 && (
                <div className="text-center py-8 text-muted-foreground">No shifts added. Click "Add Shift" to begin.</div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="space-y-6">
        <Card className="bg-primary/5 border-primary/20">
          <CardHeader><CardTitle>Pay & Rates</CardTitle></CardHeader>
          <CardContent>
            <div className="space-y-2">
              <Label>Hourly Rate</Label>
              <Input type="number" value={hourlyRate || ''} onChange={(e) => setHourlyRate(parseFloat(e.target.value) || 0)} />
            </div>
          </CardContent>
        </Card>

        <Card className="bg-primary/5 border-primary/20">
          <CardHeader><CardTitle>Totals</CardTitle></CardHeader>
          <CardContent className="space-y-6">
            <div className="p-6 bg-background rounded-xl shadow-sm border text-center relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity"><Clock className="w-16 h-16" /></div>
              <div className="text-sm text-muted-foreground mb-2 font-medium tracking-wide uppercase">Total Time</div>
              <div className="text-4xl font-bold text-primary tracking-tight">{outputs.totalHoursFormatted}</div>
              <div className="text-sm text-muted-foreground mt-2">{outputs.decimalHours} decimal hours</div>
            </div>
            
            <div className="p-6 bg-green-500/10 border border-green-500/20 rounded-xl text-center">
              <div className="text-sm text-green-800 dark:text-green-300 mb-2 font-medium tracking-wide uppercase">Estimated Gross Pay</div>
              <div className="text-4xl font-bold text-green-700 dark:text-green-400 tracking-tight">{formatAmount(outputs.grossPay)}</div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
