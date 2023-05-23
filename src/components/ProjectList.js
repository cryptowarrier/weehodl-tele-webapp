import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
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
          <div className="project-card" key={i}>
            <div>{ project.name }</div>
            <div>{`network: ${project.chain === 'Solana' ? 'Solana' : networks[project.chain].chainName}`}</div>
            <div>token</div>
            <div>{ `address: ${project.token.address}`}</div>
            <div>{ `symbol: ${project.token.name}`}</div>
            <div>{ `decimals: ${project.token.decimals}`}</div>
            <div>Accepted Currency</div>
            <div>{project.baseToken.name}</div>
          </div>
        ))
      }
    </div>
  );
}

export default ProjectList;