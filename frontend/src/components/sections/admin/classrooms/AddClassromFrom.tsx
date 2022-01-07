import React, { ReactElement, useState } from "react";
import { connect } from "react-redux";
import { addClassroomAction } from "../../../../redux/actions/adminActions";
import Input from "../../../Input";
import SubmitButton from "../../../buttons/SubmitButton";
interface Props {
  addClassroomAction: (name: string) => void;
}

function AddClassroomForm({ addClassroomAction }: Props): ReactElement {
  const [classroomForm, setClassroomForm] = useState("");
  const handleSubmitGroups = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (classroomForm !== "") addClassroomAction(classroomForm);
  };
  return (
    <>
      <h2 className="text-2xl text-center font-semibold text-font-200 ">
        Add classroom
      </h2>
      <form onSubmit={handleSubmitGroups} className="mt-">
        <fieldset>
          <Input
            name="addClassroom"
            placeholder="Classroom name"
            label="Classrooom name"
            value={classroomForm}
            onChange={(e) => setClassroomForm(e.target.value)}
          />
          <SubmitButton text="create classroom" />
        </fieldset>
      </form>{" "}
    </>
  );
}

export default connect(null, { addClassroomAction })(AddClassroomForm);
