import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { deleteTodoAction } from "../../redux/Actions";

function TodaysMenu() {
  const todaysmenu = useSelector((state) => state.todaysmenu);
  const dispatch = useDispatch();

  return (
    <div>
      {todaysmenu.map((item) => {
        return (
          <div key={item.id}>
            <p>{item.name}</p>
          </div>
        );
      })}
    </div>
  );
}

export default TodaysMenu;