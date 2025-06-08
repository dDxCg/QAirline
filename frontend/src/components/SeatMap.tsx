import React, { useState } from "react";

type Seat = {
  seat_row: number;
  seat_column: string;
  is_booked: boolean;
};

type SeatMapProps = {
  seats: Seat[];
  //   selectedSeat?: string | null;
  //   setSelectedSeat?: (seatId: string | null) => void;
};

// Group seats by row number
const SeatMap: React.FC<SeatMapProps> = ({ seats }) => {
  const [selectedSeat, setSelectedSeat] = useState<string | null>(null);

  const groupSeatsByRow = (seats: Seat[]) => {
    const rows: Record<number, Seat[]> = {};
    seats.forEach((seat) => {
      const row = seat.seat_row;
      if (!rows[row]) rows[row] = [];
      rows[row].push(seat);
    });

    return Object.entries(rows)
      .sort((a, b) => Number(a[0]) - Number(b[0]))
      .map(([row, rowSeats]) => ({
        row,
        seats: rowSeats.sort((a, b) =>
          a.seat_column.localeCompare(b.seat_column)
        ),
      }));
  };

  const groupedRows = groupSeatsByRow(seats);

  const handleSeatClick = (seat: Seat) => {
    sessionStorage.setItem("seat_row", seat.seat_row.toString());
    sessionStorage.setItem("seat_column", seat.seat_column);
    console.log(`Selected seat: ${seat.seat_row}${seat.seat_column}`);
    setSelectedSeat(`${seat.seat_row}${seat.seat_column}`);
  };

  return (
    <div className="space-y-2">
      {groupedRows.map(({ row, seats }) => (
        <div key={row} className="flex items-center space-x-2">
          <div className="w-10 text-right font-bold">{row}</div>
          {seats.map((seat, index) => {
            const seatId = `${seat.seat_row}${seat.seat_column}`;
            const isSelected = selectedSeat === seatId;
            return (
              <div
                key={index}
                onClick={() => handleSeatClick(seat)}
                className={`
                  w-10 h-10 flex items-center justify-center rounded-md font-semibold cursor-pointer
                  ${
                    seat.is_booked
                      ? "bg-red-300 text-red-900 border border-red-500 cursor-not-allowed"
                      : isSelected
                      ? "bg-blue-400 text-white border border-blue-600"
                      : "bg-green-200 text-green-900 border border-green-500 hover:bg-green-300"
                  }
                `}
                title={seatId}
              >
                {seat.seat_column}
              </div>
            );
          })}
        </div>
      ))}
    </div>
  );
};

export default SeatMap;
