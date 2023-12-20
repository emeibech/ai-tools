import { useMemo } from 'react';
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/common/components/ui/form';
import { Label } from '@/common/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/common/components/ui/select';
import { cn, generateKeys } from '@/common/lib/utils';
import type { DatePickerParams, SelectedMonth } from '@/types/routes';

const earliestValidYear = 1900;
const currentYear = new Date().getFullYear();

export default function BirthDatePicker({
  control,
  label,
  form,
}: DatePickerParams) {
  const yearsJsx = useMemo(() => generateYearsSelection(), []);
  const monthsJsx = useMemo(() => generateMonthsSelection(), []);
  const selectedMonth = form.watch('month');
  const selectedYear = form.watch('year');
  const daysJsx = useMemo(
    () => generateDaysSelection(selectedMonth, selectedYear),
    [selectedMonth, selectedYear],
  );
  return (
    <section className="flex flex-col gap-2">
      <Label className="text-md">{label}</Label>

      <div className={cn('grid grid-cols-[1fr_1.5fr_1fr] gap-2', 'relative')}>
        <FormField
          name="year"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  name={field.name}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>{...yearsJsx}</SelectContent>
                </Select>
              </FormControl>

              <FormMessage className="text-xs font-normal absolute -bottom-5" />
            </FormItem>
          )}
        />

        <FormField
          name="month"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  name={field.name}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Month" className="" />
                  </SelectTrigger>
                  <SelectContent>{...monthsJsx}</SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="day"
          control={control}
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  value={field.value}
                  name={field.name}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Day" className="text-center" />
                  </SelectTrigger>
                  <SelectContent>{...daysJsx}</SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />
      </div>
    </section>
  );
}

function generateYearsSelection() {
  const validYears = [];

  for (let year = currentYear; year >= earliestValidYear; year--) {
    validYears.push(year);
  }

  const keys = generateKeys(validYears);

  const yearSelectItems = validYears.map((year, index) => (
    <SelectItem key={keys[index]} value={year.toString()}>
      {year.toString()}
    </SelectItem>
  ));

  return yearSelectItems;
}

function generateMonthsSelection() {
  const validMonths = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const keys = generateKeys(validMonths);

  const monthSelectItems = validMonths.map((month, index) => {
    const monthNumericalVal = validMonths.indexOf(month) + 1;
    const monthFormatted =
      monthNumericalVal < 10
        ? `0${monthNumericalVal}`
        : monthNumericalVal.toString();

    return (
      <SelectItem key={keys[index]} value={monthFormatted}>
        {month}
      </SelectItem>
    );
  });

  return monthSelectItems;
}

function generateDaysSelection(
  selectedMonth: SelectedMonth,
  selectedYear: number,
) {
  const isLeapYear = Number.isInteger(selectedYear / 4);
  const maxDays = {
    '01': 31,
    '02': isLeapYear ? 29 : 28,
    '03': 31,
    '04': 30,
    '05': 31,
    '06': 30,
    '07': 31,
    '08': 31,
    '09': 30,
    '10': 31,
    '11': 30,
    '12': 31,
  };

  const maxValidDays = selectedMonth === '' ? 31 : maxDays[selectedMonth];
  const validDays = [];

  for (let day = 1; day <= maxValidDays; day++) {
    validDays.push(day < 10 ? `0${day}` : day.toString());
  }

  const keys = generateKeys(validDays);

  const daySelectItems = validDays.map((day, index) => (
    <SelectItem key={keys[index]} value={day.toString()}>
      {day.toString()}
    </SelectItem>
  ));

  return daySelectItems;
}
