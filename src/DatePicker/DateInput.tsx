import React, { useEffect, useState } from "react";

interface DateInputProps {
	onDateInput: (event: React.ChangeEvent<HTMLInputElement>) => void;
	selectedDate: string;
	onBlackoutAdd: (date: Date) => void;
}

const DateInput = ({
	onDateInput,
	selectedDate,
	onBlackoutAdd,
}: DateInputProps) => {
	const handleClickBlackoutAdd = () => {
		onBlackoutAdd(new Date(selectedDate));
	};

	return (
		<>
			<input
				style={{ marginBottom: "8px" }}
				type="text"
				value={selectedDate}
				onChange={onDateInput}
			/>
			<button onClick={handleClickBlackoutAdd}>Add to blackout dates</button>
		</>
	);
};

export default DateInput;
