import React, { ReactElement, useState } from "react";
import { connect } from "react-redux";
import { addErrorAction } from "../../../../redux/actions/adminActions";
import { addHourAction } from "../../../../redux/actions/admin/hoursActions";
import Input from "../../../Input";
import SubmitButton from "../../../buttons/SubmitButton";
interface Props {
  addHourAction: ({
    intervalName,
    periodNumber,
  }: {
    intervalName: string;
    periodNumber: number;
  }) => void;
  addErrorAction: (mess: string) => void;
}

function AddDayForm({ addHourAction, addErrorAction }: Props): ReactElement {
  const [hourForm, setHourForm] = useState({
    intervalName: "",
    periodNumber: 0,
  });
  const handleSubmitGroups = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (hourForm.intervalName === "" && hourForm.periodNumber === 0) {
      addErrorAction("Please enter an interval and period number");
    } else {
      addHourAction(hourForm);
    }
  };
  return (
    <>
      <h2 className="text-2xl text-center font-semibold text-font-200 ">
        Add hour
      </h2>
      <form onSubmit={handleSubmitGroups} className="mt-">
        <fieldset>
          <Input
            name="addHourName"
            placeholder="Interval name like 07:10-07:55"
            label="Interval name"
            value={hourForm.intervalName}
            onChange={(e) =>
              setHourForm({ ...hourForm, intervalName: e.target.value })
            }
          />
          <Input
            name="addPeriodNumber"
            type="number"
            placeholder="Period number like 1 or 2"
            label="Period number"
            value={hourForm.periodNumber.toString()}
            onChange={(e) =>
              setHourForm({
                ...hourForm,
                periodNumber: parseInt(e.target.value),
              })
            }
          />
          <SubmitButton text="create hour" />
        </fieldset>
      </form>
    </>
  );
}

export default connect(null, { addHourAction, addErrorAction })(AddDayForm);
