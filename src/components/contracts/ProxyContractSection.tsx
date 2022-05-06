import { useSetRecoilState } from 'recoil';
import { networkProxyContractSelector, ProxyContractInfo } from '../../data/proxyContracts';
import DefaultButton from '../common/forms/DefaultButton';
import { buildRolesPath } from '../common/routes/paths';
import RouteButton from '../common/routes/RouteButton';
import DetailField from '../common/typography/DetailField';
import DetailTitle from '../common/typography/DetailTitle';
import SubSectionTitle from '../common/typography/SubSectionTitle';
import ContractLink from './ContractLink';
import ContractFieldsPicker from './contractTypes/ContractFieldsPicker';
import { getLogicContractDefinition } from './logicContracts';

export interface ProxyContractSectionProps {
  proxyContractInfo: ProxyContractInfo;
}

const ProxyContractSection = ({ proxyContractInfo }: ProxyContractSectionProps) => {
  const { roles } = getLogicContractDefinition(proxyContractInfo.type);

  const setProxyContracts = useSetRecoilState(networkProxyContractSelector);

  const handleRemove = () => {
    setProxyContracts((prevProxyContracts) =>
      prevProxyContracts.filter((value) => value.address !== proxyContractInfo.address),
    );
  };

  return (
    <>
      <SubSectionTitle>{proxyContractInfo.type} Proxy</SubSectionTitle>
      <ContractFieldsPicker type={proxyContractInfo.type} address={proxyContractInfo.address} />
      <DetailField>
        <DetailTitle>Address</DetailTitle>
        <ContractLink address={proxyContractInfo.address} />
      </DetailField>
      <DetailField>
        {roles.length > 0 ? (
          <RouteButton path={buildRolesPath(proxyContractInfo.type, proxyContractInfo.address)}>Edit Roles</RouteButton>
        ) : null}{' '}
        <DefaultButton color="warning" onClick={handleRemove}>
          Remove
        </DefaultButton>
      </DetailField>
    </>
  );
};
export default ProxyContractSection;
