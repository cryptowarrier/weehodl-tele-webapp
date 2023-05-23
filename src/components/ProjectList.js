import { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { networks } from "../utils/network";
import { factory, projectContract } from "../utils/ethers.util";
import { formatUnits } from "ethers/lib/utils";
import { useTelegram } from "../hooks/useTelegram";
import { investQuery } from "../services/api.service";

const ProjectList = () => {
  const [projects, setProjects] = useState([]);
  const [currentProject, setCurrentProject] = useState();
  const [projectInfo, setProjectInfo] = useState();
  const [amount, setAmount] = useState(0);

  const [searchParams] = useSearchParams();

  const { tg, queryId, user} = useTelegram();
  useEffect(() => {
    const jsonProjects = JSON.parse(searchParams.get('projects'));
    setProjects(jsonProjects);
    tg.ready();
    tg.onEvent('mainButtonClicked', invest);
    return () => {
      tg.offEvent('mainButtonClicked');
    }
  }, []);

  useEffect(() => {
    async function getProjectInfo() {
      if (!currentProject) return;
      const chain = currentProject.chain;
      const projectId = currentProject.projectId;
      if (chain !== 'Solana') {
        const factoryContract = factory(chain);
        const projectAddress = await factoryContract.projectAtIndex(projectId);
        const project = projectContract(chain, projectAddress);
        const status = await project.status();
        const tokenDecimals = currentProject.token.decimals;
        const baseDecimals = currentProject.baseToken.decimals;
        const collected = formatUnits(status.TOTAL_BASE_COLLECTED, baseDecimals);
        const sold = Number(status.TOTAL_TOKENS_SOLD);
        const poolAmount = Number(currentProject.poolAmount);
        console.log(status)
        setProjectInfo({
          collected: collected,
          sold: sold,
          poolAmount: poolAmount,
          baseSymbol: currentProject.baseToken.name,
          tokenSymbol: currentProject.token.name,
          buyers: Number(status.NUM_BUYERS)
        });
      }
    }
    getProjectInfo();
    if(!!currentProject) {
      tg.MainButton.text = "Invest";
      tg.MainButton.show();
    } else {
      tg.MainButton.hide();
    }
  }, [currentProject]);

  const invest = async () => {
    await investQuery({
      queryId: queryId,
      amount: amount,
      projectId: currentProject._id,
      user: user.id
    });
  }


  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', padding: '10px' }}>
      {
        !currentProject && projects.map((project, i) => (
          <div onClick={() => setCurrentProject(project)} className="project-card" key={i}>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{project.name}</div>
            <div>{`network: ${project.chain === 'Solana' ? 'Solana' : networks[project.chain].chainName}`}</div>
            <div>token</div>
            <div>{`address: ${project.token.address}`}</div>
            <div>{`symbol: ${project.token.name}`}</div>
            <div>{`decimals: ${project.token.decimals}`}</div>
            <div>Accepted Currency</div>
            <div>{project.baseToken.name}</div>
          </div>
        ))
      }
      {
        (!!currentProject && !!projectInfo) && (
          <div style={{ width: '100%'}}>
            <div style={{ fontSize: '18px', fontWeight: 'bold' }}>{currentProject.name}</div>
            <div style={{margin: '20px'}}>
              <div>{`Investors: ${projectInfo.buyers}`}</div>
              <div>{`Total Sold: ${projectInfo.sold} ${projectInfo.tokenSymbol}`}</div>
              <div>{`Total Collected: ${projectInfo.collected} ${projectInfo.tokenSymbol}`}</div>
              <div>{`Min Single Ticket Amount: ${currentProject.minSpend} ${projectInfo.baseSymbol}`}</div>
              <div>{`Max Single Ticket Amount: ${currentProject.maxSpend} ${projectInfo.baseSymbol}`}</div>
            </div>
            <div style={{ display: 'flex', marginTop: '20px' }}>
              <div>{`0 ${projectInfo.baseSymbol}`}</div>
              <div style={{ flexGrow: 1 }}></div>
              <div>{`${projectInfo.poolAmount} ${projectInfo.baseSymbol}`}</div>
            </div>
            {/* <div>
              <progress style={{ width: '100%' }} max={projectInfo.poolAmount} value={Number(projectInfo.collected)} />
            </div> */}
            <div>
              <input value={amount} onChange={e => setAmount(e.target.value)} placeholder="input invest amount" type="text" />
            </div>
            <div>
              <button onClick={() => setCurrentProject()}>Back</button>
            </div>
          </div>
        )
      }
    </div>
  );
}

export default ProjectList;