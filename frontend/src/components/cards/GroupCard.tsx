import React from "react";
import Accordion from "../Accordion";

interface Props {
  open: boolean;
  setOpen: () => void;
  deleteGroup: (id: number) => void;
  group: any;
}

const GroupsCard = ({ open, group, setOpen, deleteGroup }: Props) => {
  return (
    <Accordion open={open} setOpen={setOpen}>
      <>
        <p className="mx-2 my-1">{group.name}</p>
        {open ? (
          <>
            <button
              onClick={() => deleteGroup(group.id ? group.id : 0)}
              className="mr-auto ml-2 mt-3 px-4 py-2  rounded-md my-1 bg-red-300 hover:bg-red-500 transition-all duration-500 text-white"
            >
              Delete group
            </button>
          </>
        ) : null}
      </>
    </Accordion>
  );
};

export default GroupsCard;
