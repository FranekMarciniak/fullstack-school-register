import React, { ReactElement, useState } from "react";
import {
  createUserAction,
  addErrorAction,
} from "../../../../redux/actions/adminActions";
import Input from "../../../../components/Input";
import SubmitButton from "../../../../components/buttons/SubmitButton";
import Button from "../../../../components/buttons/Button";
import { IFetchedUser } from "../../../../types/global";
import { connect } from "react-redux";

interface Props {
  createUserAction: (user: Omit<IFetchedUser, "role">, role: string) => void;
  addErrorAction: (message: string) => void;
}

function AddTeacherFrom({
  createUserAction,
  addErrorAction,
}: Props): ReactElement {
  const [formState, setFormState] = useState({
    username: "",
    password: "",
    email: "",
    firstName: "",
    lastName: "",
  });
  const clearState = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    setFormState({
      username: "",
      password: "",
      email: "",
      firstName: "",
      lastName: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      formState.username &&
      formState.password &&
      formState.email &&
      formState.firstName &&
      formState.lastName
    ) {
      createUserAction(formState, "teacher");
    } else {
      addErrorAction("Please fill the form");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <h2 className="text-2xl text-center font-semibold text-font-200 ">
          Create a teacher account
        </h2>
        <Input
          name="Username"
          placeholder="Teachers username"
          onChange={(e) =>
            setFormState({ ...formState, username: e.target.value })
          }
          value={formState.username}
        />
        <Input
          name="firstName"
          label="First name"
          placeholder="Teachers first name"
          onChange={(e) =>
            setFormState({ ...formState, firstName: e.target.value })
          }
          value={formState.firstName}
        />
        <Input
          name="lastName"
          label="Last name"
          placeholder="Teachers last name"
          onChange={(e) =>
            setFormState({ ...formState, lastName: e.target.value })
          }
          value={formState.lastName}
        />
        <Input
          name="Email"
          placeholder="Teachers email"
          onChange={(e) =>
            setFormState({ ...formState, email: e.target.value })
          }
          value={formState.email}
        />
        <Input
          name="Password"
          placeholder="Teachers password"
          onChange={(e) =>
            setFormState({ ...formState, password: e.target.value })
          }
          type="password"
          value={formState.password}
        />
        <SubmitButton text="Create teacher" />
        <Button
          onClick={clearState}
          text="Clear form"
          className="ml-3 opacity-70"
        />
      </form>
    </>
  );
}

export default connect(null, { addErrorAction, createUserAction })(
  AddTeacherFrom as React.FC
);
