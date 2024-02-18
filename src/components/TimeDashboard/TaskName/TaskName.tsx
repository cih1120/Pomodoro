import React, { useState } from "react";
import { useTimeDashboard } from "@/src/providers/TimeDashboard";
import { TimeDashboardActionTypes } from "@/src/providers/TimeDashboard/type";

const TaskName = () => {
  const { state, dispatch } = useTimeDashboard();
  const { task } = state;
  const [taskName, setTaskName] = useState("");
  const onSubmit = () => {
    dispatch({ type: TimeDashboardActionTypes.SET_TASK, payload: taskName });
  };

  return (
    <div className="mx-auto w-full max-w-60">
      {task ? (
        <h4 className="text-center text-lg text-compared-100">{task}</h4>
      ) : (
        <div className="flex gap-1">
          <span>✏️</span>
          <input
            type="text"
            className="block w-full border-b border-dashed border-compared-200 bg-transparent text-compared-200 placeholder-cherry-200"
            placeholder="What are you working on"
            value={taskName}
            maxLength={20}
            minLength={1}
            onChange={(e) => {
              setTaskName(e.target.value);
            }}
            onKeyUp={(e) => {
              if (e.key === "Enter") {
                onSubmit();
              }
            }}
            onBlur={onSubmit}
          />
        </div>
      )}
    </div>
  );
};

export default TaskName;
