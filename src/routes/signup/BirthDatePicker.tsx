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
import { generateKeys } from '@/common/lib/utils';
import type { DatePickerParams } from '@/types/routes';
import { useMemo, useState } from 'react';
import useComputeMaxDays from '../login/useComputeMaxDays';

const earliestValidYear = 1900;
const currentDate = new Date();
const currentYear = currentDate.getFullYear();

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

function generateDaysSelection(maxValidDays: number) {
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

export default function BirthDatePicker({
  control,
  label,
  form,
}: DatePickerParams) {
  const [validDays, setValidDays] = useState(31);
  const yearsJsx = useMemo(() => generateYearsSelection(), []);
  const monthsJsx = useMemo(() => generateMonthsSelection(), []);
  const daysJsx = useMemo(() => generateDaysSelection(validDays), [validDays]);

  const selectedMonth = form.getValues('month');

  useComputeMaxDays({ setValidDays, selectedMonth });
  console.log(validDays);

  return (
    <section className="flex flex-col gap-2">
      <Label className="text-md">{label}</Label>

      <div className="grid grid-cols-[1fr_1.5fr_1fr] gap-2">
        <FormField
          name="year"
          control={control}
          render={({ field }) => (
            <FormItem {...field}>
              <FormMessage className="absolute -top-6 text-xs font-normal" />
              <FormControl>
                <Select onValueChange={field.onChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Year" />
                  </SelectTrigger>
                  <SelectContent>{...yearsJsx}</SelectContent>
                </Select>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          name="month"
          control={control}
          render={({ field }) => (
            <FormItem {...field}>
              <FormControl>
                <Select onValueChange={field.onChange}>
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
            <FormItem {...field}>
              <FormControl>
                <Select onValueChange={field.onChange}>
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
