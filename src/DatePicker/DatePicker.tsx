import React, { useState } from "react";
import CalendarInput from "./CalendarInput";
import DateInput from "./DateInput";

const DatePicker = () => {
	const [selectedDate, setSelectedDate] = useState<Date>(new Date());
	const [inputValue, setInputValue] = useState<string>("");
	const [blackoutDates, setBlackoutDates] = useState<Date[]>([]);

	const formatDate = (date: string) => {
		return date.replace(/(\d{2})(\d{2})(\d{4})/, "$1/$2/$3");
	};

	const handleDateInputChange = (
		event: React.ChangeEvent<HTMLInputElement>
	) => {
		const input = event.target.value.replace(/\D/g, ""); // remove non-numeric characters
		const formattedInput = formatDate(input);
		setInputValue(formattedInput);
		setSelectedDate(new Date(formattedInput));
	};

	const handleDayClick = (day: Date) => {
		setSelectedDate(day);
		const dayString: string = day.toLocaleDateString();
		const dayFormatted: string = formatDate(dayString);
		setInputValue(dayFormatted);
	};

	const handleAddBlackoutDate = (date: Date) => {
		setBlackoutDates([...blackoutDates, date]);
	};

	return (
		<>
			<DateInput
				onBlackoutAdd={handleAddBlackoutDate}
				onDateInput={handleDateInputChange}
				selectedDate={inputValue}
			/>
			<CalendarInput
				date={selectedDate}
				onDayClick={handleDayClick}
				blackoutDates={blackoutDates}
			/>
		</>
	);
};

export default DatePicker;
