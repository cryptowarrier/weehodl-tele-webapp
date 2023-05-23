import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { networks } from "../utils/network";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);

  const [searchParams] = useSearchParams();
  useEffect(() => {
    const jsonProjects = JSON.parse(searchParams.get('projects'));
    setProjects(jsonProjects);
  }, []);
  return (
    <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {
        projects.map((project, i) => (
          <Link className="project-card" style={{textDecoration: 'none'}} to={`/project?data=${encodeURIComponent(project)}`}>
            <div key={i}>
              <div>{project.name}</div>
              <div>{`network: ${project.chain === 'Solana' ? 'Solana' : networks[project.chain].chainName}`}</div>
              <div>token</div>
              <div>{`address: ${project.token.address}`}</div>
              <div>{`symbol: ${project.token.name}`}</div>
              <div>{`decimals: ${project.token.decimals}`}</div>
              <div>Accepted Currency</div>
              <div>{project.baseToken.name}</div>
            </div>
          </Link>
        ))
      }
    </div>
  );
}

export default ProjectList;