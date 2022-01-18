import React, { ReactElement, useState } from "react";
import { connect } from "react-redux";
import { addErrorAction } from "../../../../redux/actions/adminActions";
import { addDayAction } from "../../../../redux/actions/admin/daysActions";
import Input from "../../../Input";
import SubmitButton from "../../../buttons/SubmitButton";
interface Props {
  addDayAction: ({
    name,
    dayNumber,
  }: {
    name: string;
    dayNumber: number;
  }) => void;
  addErrorAction: (mess: string) => void;
}

function AddDayForm({ addDayAction, addErrorAction }: Props): ReactElement {
  const [dayForm, setDayForm] = useState({ name: "", dayNumber: 0 });
  const handleSubmitGroups = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (dayForm.name === "" && dayForm.dayNumber === 0) {
      addErrorAction("Please enter a day name and number");
    } else {
      addDayAction(dayForm);
    }
  };
  return (
    <>
      <h2 className="text-2xl text-center font-semibold text-font-200 ">
        Add day
      </h2>
      <form onSubmit={handleSubmitGroups} className="mt-">
        <fieldset>
          <Input
            name="addDayName"
            placeholder="Day name"
            label="Day name"
            value={dayForm.name}
            onChange={(e) => setDayForm({ ...dayForm, name: e.target.value })}
          />
          <Input
            name="addDayNumber"
            type="number"
            placeholder="Day number"
            label="Day number"
            value={dayForm.dayNumber.toString()}
            onChange={(e) =>
              setDayForm({ ...dayForm, dayNumber: parseInt(e.target.value) })
            }
          />
          <SubmitButton text="create day" />
        </fieldset>
      </form>
    </>
  );
}

export default connect(null, { addDayAction, addErrorAction })(AddDayForm);
