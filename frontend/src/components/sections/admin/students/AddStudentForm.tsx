import React, { ReactElement, useState } from "react";
import { addErrorAction } from "../../../../redux/actions/adminActions";
import { createUserAction } from "../../../../redux/actions/admin/usersActions";
import Input from "../../../../components/Input";
import SubmitButton from "../../../../components/buttons/SubmitButton";
import SelectSearch from "../../../../components/SelectSearch";
import Button from "../../../../components/buttons/Button";
import { IAdminState, IFetchedUser } from "../../../../types/global";
import { connect } from "react-redux";

interface Props {
  createUserAction: (
    user: Omit<IFetchedUser, "role">,
    role: string,
    group: number
  ) => void;
  addErrorAction: (message: string) => void;
  admin: IAdminState;
}

function AddStudentFrom({
  createUserAction,
  addErrorAction,
  admin,
}: Props): ReactElement {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
    group_id: 0,
  });
  const clearState = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setFormState({
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
      group_id: 0,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formState.username &&
      formState.password &&
      formState.email &&
      formState.firstName &&
      formState.lastName &&
      formState.group_id
    ) {
      createUserAction(formState, "student", formState.group_id);
    } else {
      addErrorAction("Please fill the form");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl text-center font-semibold text-font-200 ">
          Create a student account
        </h2>
        <Input
          name="Username"
          placeholder="Students username"
          onChange={(e) =>
            setFormState({ ...formState, username: e.target.value })
          }
          value={formState.username}
        />
        <Input
          name="firstName"
          label="First name"
          placeholder="Students first name"
          onChange={(e) =>
            setFormState({ ...formState, firstName: e.target.value })
          }
          value={formState.firstName}
        />
        <Input
          name="lastName"
          label="Last name"
          placeholder="Students last name"
          onChange={(e) =>
            setFormState({ ...formState, lastName: e.target.value })
          }
          value={formState.lastName}
        />
        <Input
          name="Email"
          placeholder="Students email"
          onChange={(e) =>
            setFormState({ ...formState, email: e.target.value })
          }
          value={formState.email}
        />
        <Input
          name="Password"
          placeholder="Students password"
          onChange={(e) =>
            setFormState({ ...formState, password: e.target.value })
          }
          type="password"
          value={formState.password}
        />
        <SelectSearch
          options={admin.groups}
          value={formState.group_id}
          setValue={(value: number) =>
            setFormState({ ...formState, group_id: value })
          }
          label={"Students group"}
          placeholder={"Select group"}
          keysToDisplay={["name"]}
        />
        <SubmitButton text="Create student" />
        <Button
          onClick={clearState}
          text="Clear form"
          className="ml-3 opacity-70"
        />
      </form>
    </>
  );
}
const mapStateToProps = ({ admin }: { admin: IAdminState }) => ({
  admin,
});
export default connect(mapStateToProps, { addErrorAction, createUserAction })(
  AddStudentFrom as React.FC
);
