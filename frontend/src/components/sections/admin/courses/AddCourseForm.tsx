import React, { useEffect, useState, ReactElement } from "react";
import { connect } from "react-redux";
import {
  getGroupsAction,
  getTeachersAction,
  getCoursesAction,
  addCourseAction,
} from "../../../../redux/actions/adminActions";
import { IAdminState } from "../../../../types/global";
import SelectSearch from "../../../SelectSearch";
import Button from "../../../buttons/Button";
import Input from "../../../Input";
import SubmitButton from "../../../buttons/SubmitButton";
interface Props {
  admin: IAdminState;
  addCourseAction: ({ name, group_id, teacher_id }: any) => void;
  getGroupsAction: () => void;
  getTeachersAction: () => void;
  getCoursesAction: () => void;
  teachers: any[];
  groups: any[];
}

function AddCourseForm({
  addCourseAction,
  getGroupsAction,
  getTeachersAction,
  getCoursesAction,
  teachers,
  groups,
}: Props): ReactElement {
  useEffect(() => {
    getGroupsAction();
    getTeachersAction();
    getCoursesAction();
  }, []);
  const [courseForm, setCourseForm] = useState({
    name: "",
    group_id: 0,
    teacher_id: 0,
  });

  const handleSubmitCourses = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    addCourseAction(courseForm);
  };
  return (
    <>
      <h2 className="text-2xl text-center font-semibold text-font-200 ">
        Add course
      </h2>
      <form onSubmit={handleSubmitCourses} className="mt-">
        <fieldset>
          <Input
            name="courseName"
            placeholder="Course Name"
            label="Enter course name"
            value={courseForm.name}
            onChange={(e) =>
              setCourseForm({ ...courseForm, name: e.target.value })
            }
          />
          <SelectSearch
            options={groups}
            setValue={(value: number) =>
              setCourseForm({ ...courseForm, group_id: value })
            }
            value={courseForm.group_id}
            placeholder="Group name"
            label="Choose a group"
            keysToDisplay={["name"]}
          />
          <SelectSearch
            options={teachers}
            setValue={(value: number) =>
              setCourseForm({ ...courseForm, teacher_id: value })
            }
            value={courseForm.teacher_id}
            placeholder="Teachers name"
            label="Choose a teacher"
            keysToDisplay={["firstName", "lastName"]}
          />
        </fieldset>
        <SubmitButton text="create course" />
        <Button
          onClick={(e: any) => {
            e.preventDefault();
            setCourseForm({
              name: "",
              group_id: 0,
              teacher_id: 0,
            });
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
export default connect(mapStateToProps, {
  getGroupsAction,
  getTeachersAction,
  getCoursesAction,
  addCourseAction,
})(AddCourseForm);
