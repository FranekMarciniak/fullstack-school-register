import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import SelectSearchCourses from "../../components/SelectSearchCourses";
import { Meta } from "../../layout/Meta";
import {
  addGradeAction,
  getGradesAction,
  editGradeAction,
  deleteGradeAction,
} from "../../redux/actions/teacher/gradesActions";
import { getCoursesAction } from "../../redux/actions/teacher/coursesActions";
import Main from "../../templates/Main";
import Routes from "../../utils/Routes";
import Input from "../../components/Input";
import SubmitButton from "../../components/buttons/SubmitButton";
import { addErrorAction } from "../../redux/actions/adminActions";
import Button from "../../components/buttons/Button";
import GradesTable from "../../components/sections/teacher/GradesTable";
interface Props {
  teacher: any;
  getCoursesAction: () => void;
  getGradesAction: (id: number) => void;
  addGradeAction: (form: any) => void;
  addErrorAction: (message: string) => void;
  editGradeAction: (form: any) => void;
  deleteGradeAction: (id: number, student_id: number) => void;
}

const Grades = ({
  teacher,
  getCoursesAction,
  addGradeAction,
  getGradesAction,
  addErrorAction,
  editGradeAction,
  deleteGradeAction,
}: Props) => {
  const [course, setCourse] = useState(0);
  const fromInitialState = {
    value: 0,
    weight: 0,
    student_id: 0,
    description: "",
    grade_id: 0,
    course_id: course,
  };
  const [gradeFormModal, setGradeFormModal] = useState({
    open: false,
    edit: false,
  });
  const [gradeForm, setGradeForm] = useState(fromInitialState);
  useEffect(() => {
    getCoursesAction();
  }, []);
  useEffect(() => {
    if (course === 0) {
    } else {
      getGradesAction(course);
    }
    setGradeForm({ ...gradeForm, course_id: course });
  }, [course]);

  const handleAddGradeClick = (student: number) => {
    setGradeForm({ ...gradeForm, student_id: student });
    setGradeFormModal({ edit: false, open: true });
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (gradeForm.student_id && gradeForm.value && gradeForm.course_id) {
      gradeFormModal.edit
        ? editGradeAction(gradeForm)
        : addGradeAction(gradeForm);
      setGradeForm(fromInitialState);
      setGradeFormModal({ open: false, edit: false });
    } else {
      addErrorAction("Please fill the form");
    }
  };

  return (
    <Main meta={<Meta title="Mars" description="" />}>
      <div className="w-full flex flex-col flex-wrap items-center justify-content lg:h-screen ">
        {gradeFormModal.open ? (
          <>
            <div
              className="absolute w-full bg-black opacity-80 h-screen"
              onClick={(e: any) => {
                e.stopPropagation();
                setGradeFormModal({ open: false, edit: false });
                setGradeForm(fromInitialState);
              }}
            ></div>
            <form
              className="mx-auto top-1/4 w-8/12 bg-white z-30 absolute p-5 rounded"
              onSubmit={handleSubmit}
            >
              <Input
                name="Grade"
                value={gradeForm.value.toString()}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setGradeForm({
                    ...gradeForm,
                    value: parseInt(e.target.value),
                  })
                }
                type="number"
                placeholder={"Enter grade value"}
              />{" "}
              <Input
                name="Weight"
                value={gradeForm.weight.toString()}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setGradeForm({
                    ...gradeForm,
                    weight: parseInt(e.target.value),
                  })
                }
                type="number"
                placeholder={"Enter grade weight"}
              />{" "}
              <Input
                name="Description"
                value={gradeForm.description}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  setGradeForm({
                    ...gradeForm,
                    description: e.target.value,
                  })
                }
                placeholder={"Enter grade description"}
              />
              {gradeFormModal.edit ? (
                <>
                  <SubmitButton text="Edit grade" />
                  <Button
                    text="Delete grade"
                    onClick={(e: React.FormEvent) => {
                      e.preventDefault();
                      console.log("first");
                      deleteGradeAction(
                        gradeForm.grade_id,
                        gradeForm.student_id
                      );
                      setGradeFormModal({ open: false, edit: false });
                    }}
                    className="bg-red-400 hover:bg-red-500 ml-2"
                  />
                </>
              ) : (
                <SubmitButton text="Add grade" />
              )}
            </form>
          </>
        ) : null}

        <main className="w-full h-full flex flex-col flex-wrap mt-4 ">
          <section className="w-full mb-10 px-2 flex ">
            {course === 0 ? (
              <SelectSearchCourses
                options={teacher.courses}
                setValue={(value: number) => setCourse(value)}
                value={course}
                placeholder="course"
                label="Choose an course"
                keysToDisplay={["name", `group`]}
                nestedObjectKey={{ key: "group", name: "name" }}
                className={"w-full"}
              />
            ) : (
              <button
                className="w-9/12 mx-auto font-medium bg-gray-300 text-gray-800  py-2 rounded-md shadow"
                onClick={() => setCourse(0)}
              >
                Click to select another course
              </button>
            )}
          </section>
          <section className="flex flex-wrap items-start gap-4 ">
            {course !== 0 && (
              <GradesTable
                teacherState={teacher}
                setGradeForm={setGradeForm}
                setGradeFormModal={setGradeFormModal}
                handleAddGrade={handleAddGradeClick}
              />
            )}
          </section>
        </main>
      </div>
    </Main>
  );
};
const mapStateToProps = ({ teacher }: { teacher: any }) => ({
  teacher,
});

const ConnectedComponent = connect(mapStateToProps, {
  getCoursesAction,
  getGradesAction,
  addErrorAction,
  addGradeAction,
  editGradeAction,
  deleteGradeAction,
})(Grades as React.FC);
export default Routes.withRole(ConnectedComponent, "teacher");
