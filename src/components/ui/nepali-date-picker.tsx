
'use client';
import { NepaliDatePicker } from "nepali-datepicker-reactjs";
import { cn } from "@/lib/utils";
import { NEPALI_MONTHS } from "@/lib/nepal-data";

interface NepaliDatePickerProps {
    value: string;
    onChange: (value: string) => void;
    className?: string;
    inputClassName?: string;
}

export function NepaliDatepicker({ value, onChange, className, inputClassName }: NepaliDatePickerProps) {
    
    // Converts "YYYY MonthName DD" to "YYYY-MM-DD" for the library
    const formattedToRaw = (formattedDate: string): string => {
        if (!formattedDate || !formattedDate.includes(' ')) return formattedDate; // It's likely already raw or empty
        const parts = formattedDate.split(' ');
        if (parts.length !== 3) return formattedDate;

        const [year, monthName, day] = parts;
        const month = NEPALI_MONTHS.find(m => m.label.toLowerCase() === monthName.toLowerCase());

        if (!month) return formattedDate; // Could not parse
        return `${year}-${month.value}-${day}`;
    };

    // Converts "YYYY-MM-DD" from the library to "YYYY MonthName DD"
    const handleOnChange = (rawDate: string) => {
        if (!rawDate || !rawDate.includes('-')) {
            onChange(rawDate);
            return;
        };
        const parts = rawDate.split('-');
        if (parts.length !== 3) {
            onChange(rawDate);
            return;
        }
        const [year, monthNum, day] = parts;

        const month = NEPALI_MONTHS.find(m => m.value === monthNum);
        if (!month) {
            onChange(rawDate);
            return;
        }
        
        onChange(`${year} ${month.label} ${day}`);
    };

    return (
        <NepaliDatePicker
            inputClassName={cn(
                "flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
                inputClassName
            )}
            className={cn("w-full", className)}
            value={formattedToRaw(value)}
            onChange={handleOnChange}
            options={{ calenderLocale: "en", valueLocale: "en" }}
        />
    )
}
