'use client';

import * as React from 'react';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { cn } from '@/lib/utils';
import { DateRange } from 'react-day-picker';

type Props = {
  value: DateRange | undefined;
  onChange: (range: DateRange | undefined) => void;
};

export default function DateRangeSelector({ value, onChange }: Props) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'w-full justify-start text-left font-normal',
            !value && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {value?.from ? (
            value.to ? (
              <>
                {format(value.from, 'MMM dd, yyyy')} –{' '}
                {format(value.to, 'MMM dd, yyyy')}
              </>
            ) : (
              format(value.from, 'MMM dd, yyyy')
            )
          ) : (
            <span>Select date range</span>
          )}
        </Button>
      </PopoverTrigger>

      {/* ✅ Just add dropdown-portal here to prevent accidental collapse */}
      <PopoverContent className="w-auto p-0 dropdown-portal" align="start">
        <Calendar
          mode="range"
          selected={value}
          onSelect={onChange}
          numberOfMonths={1} // ✅ Only one month shown
        />
      </PopoverContent>
    </Popover>
  );
}
