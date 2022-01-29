import React from "react";

type Props = {
  teacherState: any;
  setGradeForm: (formData: any) => void;
  setGradeFormModal: (modalForm: any) => void;
  handleAddGrade: (grade_id: number) => void;
};

function GradesTable({
  teacherState,
  setGradeForm,
  setGradeFormModal,
  handleAddGrade,
}: Props) {
  return (
    <div className="flex flex-col w-full ">
      <div className=" overflow-x-hidden">
        <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8 ">
          <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg ">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-4/12"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Grades
                  </th>{" "}
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider w-2/12"
                  ></th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {teacherState.grades.map((grade: any, i: number) => (
                  <tr key={i}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="ml-4">
                          <div className="text-sm font-medium text-gray-900">
                            {grade.firstName} {grade.lastName}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap flex flex-wrap ">
                      {grade.grades.map((grade: any) => {
                        return (
                          <>
                            <p
                              className="mx-2 my-1 p-1  border-black"
                              style={{ border: "1px solid" }}
                              onClick={() => {
                                const {
                                  course_id,
                                  description,
                                  student_id,
                                  value,
                                  weight,
                                  id,
                                } = grade;
                                setGradeForm({
                                  course_id,
                                  description,
                                  student_id,
                                  value,
                                  weight,
                                  grade_id: id,
                                });
                                setGradeFormModal({
                                  open: true,
                                  edit: true,
                                });
                              }}
                            >
                              {grade.value}
                            </p>
                          </>
                        );
                      })}
                    </td>
                    <td>
                      <button
                        className="m-0 p-2 bg-indigo-400 rounded text-white"
                        onClick={() => handleAddGrade(grade.id)}
                      >
                        Add grade
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GradesTable;
