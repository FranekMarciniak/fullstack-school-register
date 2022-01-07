import React from "react";
import Accordion from "../Accordion";

interface Props {
  open: boolean;
  setOpen: () => void;
  deleteHour: (id: number) => void;
  hour: any;
}

const HourCard = ({ open, hour, setOpen, deleteHour }: Props) => {
  return (
    <Accordion open={open} setOpen={setOpen}>
      <>
        <p className="mx-2 my-1">{hour.periodNumber}</p>
        <p className="mx-2 my-1">{hour.intervalName}</p>
        {open ? (
          <>
            <button
              onClick={() => deleteHour(hour.id ? hour.id : 0)}
              className="mr-auto ml-2 mt-3 px-4 py-2  rounded-md my-1 bg-red-300 hover:bg-red-500 transition-all duration-500 text-white"
            >
              Delete hour
            </button>
          </>
        ) : null}
      </>
    </Accordion>
  );
};

export default HourCard;
