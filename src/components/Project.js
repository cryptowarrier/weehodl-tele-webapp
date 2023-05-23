import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const Project = () => {
  const [project, setProject] = useState();

  const [searchParams] = useSearchParams();
  useEffect(() => {
    
  }, []);
  return (
    <div>Project</div>
  );
}

export default Project;