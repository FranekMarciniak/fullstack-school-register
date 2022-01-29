import React, { useState, ReactElement } from "react";
import { connect } from "react-redux";
import { IAdminState } from "../../../../types/global";
import SelectSearch from "../../../SelectSearch";
import Button from "../../../buttons/Button";
import SubmitButton from "../../../buttons/SubmitButton";
import SelectSearchCourses from "../../../SelectSearchCourses";
import {
  addErrorAction,
  ILessonToCreate,
} from "../../../../redux/actions/adminActions";
import { addLessonAction } from "../../../../redux/actions/admin/lessonsActions";
interface Props {
  admin: IAdminState;
  addLessonAction: (arg0: ILessonToCreate) => void;
  addErrorAction: (message: string) => void;
}

function AddLessonForm({
  admin,
  addLessonAction,
  addErrorAction,
}: Props): ReactElement {
  const initialFormState = {
    hour_id: 0,
    day_id: 0,
    classroom_id: 0,
    course_id: 0,
  };
  const [lessonForm, setLessonForm] = useState(initialFormState);

  const handleSubmitCourses = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (
      lessonForm.hour_id !== 0 &&
      lessonForm.day_id !== 0 &&
      lessonForm.classroom_id !== 0 &&
      lessonForm.course_id !== 0
    ) {
      addLessonAction(lessonForm);
    } else {
      addErrorAction("Please fill the form");
    }
  };
  return (
    <>
      <h2 className="text-2xl text-center font-semibold text-font-200 ">
        Add lesson
      </h2>
      <form onSubmit={handleSubmitCourses} className="mt-">
        <fieldset>
          <SelectSearch
            options={admin.days}
            setValue={(value: number) =>
              setLessonForm({ ...lessonForm, day_id: value })
            }
            value={lessonForm.day_id}
            placeholder="Days"
            label="Choose an day"
            keysToDisplay={["name"]}
          />
          <SelectSearch
            options={admin.hours}
            setValue={(value: number) =>
              setLessonForm({ ...lessonForm, hour_id: value })
            }
            value={lessonForm.hour_id}
            placeholder="Hours"
            label="Choose an hour"
            keysToDisplay={["periodNumber", "intervalName"]}
          />{" "}
          <SelectSearch
            options={admin.classrooms}
            setValue={(value: number) =>
              setLessonForm({ ...lessonForm, classroom_id: value })
            }
            value={lessonForm.classroom_id}
            placeholder="Classroom"
            label="Choose an classroom"
            keysToDisplay={["name"]}
          />
          <SelectSearchCourses
            options={admin.courses}
            setValue={(value: number) =>
              setLessonForm({ ...lessonForm, course_id: value })
            }
            value={lessonForm.course_id}
            placeholder="course"
            label="Choose an course"
            keysToDisplay={["name", `group`]}
            nestedObjectKey={{ key: "group", name: "name" }}
          />{" "}
        </fieldset>
        <SubmitButton text="create course" />
        <Button
          onClick={(e) => {
            e.preventDefault();
            setLessonForm(initialFormState);
          }}
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
export default connect(mapStateToProps, { addErrorAction, addLessonAction })(
  AddLessonForm as React.FC
);
