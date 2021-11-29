import React from "react";

interface Props {
  open: boolean;
}

const TeachersCard = ({ open }: Props) => {
  return (
    <div className="bg-indigo-700 ">
      <h1>Teacher</h1>
      <p>Description</p>
    </div>
  );
};

export default TeachersCard;
