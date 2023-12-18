import { useEffect } from 'react';

interface ComputeMaxDaysParam {
  setValidDays: React.Dispatch<React.SetStateAction<number>>;
  selectedMonth:
    | '01'
    | '02'
    | '03'
    | '04'
    | '05'
    | '06'
    | '07'
    | '08'
    | '09'
    | '10'
    | '11'
    | '12'
    | '';
}

const currentYear = new Date().getFullYear();

function isLeapYear(year: number) {
  return Number.isInteger(year / 4);
}

const maxDays = {
  '01': 31,
  '02': isLeapYear(currentYear) ? 29 : 28,
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

export default function useComputeMaxDays({
  setValidDays,
  selectedMonth,
}: ComputeMaxDaysParam) {
  useEffect(() => {
    console.log('useComputeMaxDays effect');
    if (selectedMonth !== '') {
      setValidDays(maxDays[selectedMonth]);
    }
  }, [setValidDays, selectedMonth]);
}
