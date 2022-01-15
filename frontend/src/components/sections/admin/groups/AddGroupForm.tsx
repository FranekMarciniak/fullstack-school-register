import React, { ReactElement, useState } from "react";
import { connect } from "react-redux";
import { addGroupAction } from "../../../../redux/actions/admin/groupsActions";
import Input from "../../../Input";
import SubmitButton from "../../../buttons/SubmitButton";
interface Props {
  addGroupAction: (name: string) => void;
}

function AddGroupForm({ addGroupAction }: Props): ReactElement {
  const [groupsForm, setGroupsForm] = useState("");
  const handleSubmitGroups = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (groupsForm !== "") addGroupAction(groupsForm);
  };
  return (
    <>
      <h2 className="text-2xl text-center font-semibold text-font-200 ">
        Add groups
      </h2>
      <form onSubmit={handleSubmitGroups} className="mt-">
        <fieldset>
          <Input
            name="addGroups"
            placeholder="Group name"
            label="Group name"
            value={groupsForm}
            onChange={(e) => setGroupsForm(e.target.value)}
          />
          <SubmitButton text="create group" />
        </fieldset>
      </form>{" "}
    </>
  );
}

export default connect(null, { addGroupAction })(AddGroupForm);
