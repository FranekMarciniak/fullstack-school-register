import React, { useEffect, useState, ReactElement } from "react";
import { connect } from "react-redux";
import { deleteGroupAction } from "../../../../redux/actions/admin/groupsActions";
import Input from "../../../Input";
import { IAdminState, IGroup } from "../../../../types/global";
import GroupCard from "../../../cards/GroupCard";

interface Props {
  admin: IAdminState;
  deleteGroupAction: (id: number) => void;
}

function GroupsList({ admin, deleteGroupAction }: Props): ReactElement {
  const [search, setSearch] = useState("");
  const [groups, setGroups] = useState([] as IGroup[]);
  const [activeCard, setActiveCard] = useState(0);

  useEffect(() => setGroups(admin.groups), []);

  const handleSearch = (text: string) => {
    if (text === "") {
      setGroups(admin.groups);
    } else {
      setGroups(
        groups.filter(
          (group) => group.name.toLowerCase().indexOf(text.toLowerCase()) > -1
        )
      );
    }
  };
  return (
    <>
      <form className="mt-5">
        <Input
          name="Group name"
          placeholder="Search for the group"
          onChange={(e) => {
            setSearch(e.target.value);
            handleSearch(e.target.value);
          }}
          value={search}
        ></Input>
      </form>
      <div className=" lg:flex-grow flex overflow-y-auto overflow-x-hidden w-full">
        <ul className="list-none w-full">
          {search
            ? groups.map((group, i: number) => (
                <GroupCard
                  group={group}
                  open={i + 1 === activeCard ? true : false}
                  setOpen={() =>
                    setActiveCard(activeCard === i + 1 ? 0 : i + 1)
                  }
                  key={i + 1}
                  deleteGroup={deleteGroupAction}
                />
              ))
            : admin.groups.map((group, i: number) => (
                <GroupCard
                  group={group}
                  open={i + 1 === activeCard ? true : false}
                  setOpen={() =>
                    setActiveCard(activeCard === i + 1 ? 0 : i + 1)
                  }
                  key={i + 1}
                  deleteGroup={deleteGroupAction}
                />
              ))}
        </ul>
      </div>
    </>
  );
}
const mapStateToProps = ({ admin }: { admin: IAdminState }) => ({
  admin,
});

export default connect(mapStateToProps, { deleteGroupAction })(GroupsList);
