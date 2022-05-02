import { buildCreateParcelNFTTransactionRequest } from '@citydao/parcel-contracts/dist/src/contracts/parcelNFT';
import { useSetRecoilState } from 'recoil';
import { networkProxyContractSelector } from '../../../data/proxyContracts';
import { WalletDetails } from '../../../data/wallet';
import { useFormFields } from '../../../hooks/forms';
import DefaultTextField from '../../common/forms/DefaultTextField';
import { usePaths } from '../../common/routes/paths';
import SubSectionTitle from '../../common/typography/SubSectionTitle';
import DeployContract from '../DeployContract';
import { LogicContractType } from '../logicContracts';

export interface DeployParcelNFTProxyProps {
  wallet: WalletDetails;
  logicAddress: string;
}

interface DeployParcelNFTProxyFields {
  name: string;
  symbol: string;
}

const DeployParcelNFTProxy = ({ wallet, logicAddress }: DeployParcelNFTProxyProps) => {
  const { fields, handleFieldChange } = useFormFields<DeployParcelNFTProxyFields>({
    name: '',
    symbol: '',
  });

  const setProxyContracts = useSetRecoilState(networkProxyContractSelector);
  const { gotoContracts } = usePaths();

  const networkName = wallet.network.key;

  const handleDeployed = (contractAddress: string) => {
    setProxyContracts((prevProxyContracts) => [
      ...prevProxyContracts,
      { networkName, type: LogicContractType.ParcelNFT, address: contractAddress },
    ]);
    gotoContracts();
  };

  return (
    <>
      <SubSectionTitle>ParcelNFT Proxy</SubSectionTitle>
      <DefaultTextField
        autoFocus
        name="name"
        type="text"
        label="Name"
        autoComplete="off"
        value={fields.name}
        required
        onChange={handleFieldChange}
      />
      <DefaultTextField
        name="symbol"
        type="text"
        label="Symbol"
        autoComplete="off"
        value={fields.symbol}
        required
        onChange={handleFieldChange}
      />

      <DeployContract
        transactionRequest={buildCreateParcelNFTTransactionRequest(logicAddress, {
          name: fields.name,
          symbol: fields.symbol,
        })}
        onDeployed={handleDeployed}
      />
    </>
  );
};
export default DeployParcelNFTProxy;
