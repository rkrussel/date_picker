import React from "react";
import "./CalendarInput.css";

const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

interface Props {
	date: Date;
	onDayClick: (date: Date) => void;
	blackoutDates: Date[];
}

const CalendarInput: React.FC<Props> = ({
	date,
	onDayClick,
	blackoutDates,
}) => {
	const handlePrevMonthClick = () => {
		const prevMonth = new Date(date.getFullYear(), date.getMonth() - 1, 1);
		onDayClick(prevMonth);
	};

	const handleNextMonthClick = () => {
		const nextMonth = new Date(date.getFullYear(), date.getMonth() + 1, 1);
		onDayClick(nextMonth);
	};

	const daysInMonth = new Date(
		date.getFullYear(),
		date.getMonth() + 1,
		0
	).getDate();

	const days: Date[] = [];

	for (let i = 1; i <= daysInMonth; i++) {
		days.push(new Date(date.getFullYear(), date.getMonth(), i));
	}

	const firstDayOfMonth = new Date(date.getFullYear(), date.getMonth(), 1);
	const startingDayOfWeek = firstDayOfMonth.getDay();

	const rows: React.ReactNode[] = [];
	let currentRow: React.ReactNode[] = [];

	// Add empty cells for days before the first day of the month
	for (let i = 0; i < startingDayOfWeek; i++) {
		currentRow.push(<td key={`empty-${i}`}></td>);
	}

	days.forEach((day) => {
		const isCurrentDate = day.toDateString() === new Date().toDateString();
		const isGivenDate = day.toDateString() === date.toDateString();
		const isDisabled = blackoutDates.some((blackout: Date) => {
			return blackout.toDateString() === day.toDateString();
		});

		const handleDayClick = () => {
			if (onDayClick && !isDisabled) {
				onDayClick(day);
			}
		};

		const tdClasses = ["calendar-day"];
		let style = { backgroundColor: "", color: "" };
		if (isCurrentDate) {
			tdClasses.push("current-date");
			style.backgroundColor = "#CCC";
			style.color = "blue";
		}
		if (isGivenDate) {
			tdClasses.push("given-date");
			style.backgroundColor = "white";
			style.color = "black";
		}
		if (isDisabled) {
			style.backgroundColor = "black";
			style.color = "grey";
		}

		currentRow.push(
			<td key={day.toDateString()} onClick={handleDayClick} style={style}>
				{day.getDate()}
			</td>
		);

		if (currentRow.length === 7) {
			rows.push(<tr key={day.toDateString()}>{currentRow}</tr>);
			currentRow = [];
		}
	});

	// Add empty cells for days after the last day of the month
	while (currentRow.length < 7) {
		currentRow.push(<td key={`empty-${currentRow.length}`}></td>);
	}
	rows.push(<tr key="last-row">{currentRow}</tr>);

	return (
		<div className="calendar">
			<div className="calendar-header">
				<button
					style={{ display: "inline-block" }}
					className="calendar-prev-month"
					onClick={handlePrevMonthClick}
				>
					&lt;
				</button>
				<div
					className="calendar-month-year"
					style={{ display: "inline-block" }}
				>
					{date.toLocaleDateString(undefined, {
						month: "long",
						year: "numeric",
					})}
				</div>
				<button
					className="calendar-next-month"
					onClick={handleNextMonthClick}
					style={{ display: "inline-block" }}
				>
					&gt;
				</button>
			</div>
			<table>
				<thead>
					<tr>
						{daysOfWeek.map((dayOfWeek) => (
							<th key={dayOfWeek}>{dayOfWeek}</th>
						))}
					</tr>
				</thead>
				<tbody>{rows}</tbody>
			</table>
		</div>
	);
};

export default CalendarInput;
