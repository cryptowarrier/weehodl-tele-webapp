import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const ProjectList = () => {
  const [projects, setProjects] = useState();

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const projectsQuery = searchParams.get('projects');
    setProjects(JSON.parse(projectsQuery));
  }, []);
  return (
    <div>{JSON.stringify(projects)}</div>
  );
}

export default ProjectList;