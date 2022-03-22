import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectProjects } from "../projectsSlice";

export function Projects() {
  const projects = useSelector(selectProjects);
  const dispatch = useDispatch();

  return (
    <div>
      projects component
    </div>
  );
}
