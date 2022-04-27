import { buildCreateParcelNFTTransactionRequest } from '@citydao/parcel-contracts/dist/src/contracts/parcelNFT';
import { findLogicContractByType } from '../../data/contracts';
import { WalletDetails } from '../../data/wallet';
import { useFormFields } from '../../hooks/forms';
import DefaultTextField from '../common/forms/DefaultTextField';
import SectionTitle from '../common/typography/SectionTitle';
import DeployContract from './DeployContract';

export interface DeployParcelNFTProxyProps {
  wallet: WalletDetails;
}

interface DeployParcelNFTProxyFields {
  name: string;
  symbol: string;
}

const DeployParcelNFTProxy = ({ wallet }: DeployParcelNFTProxyProps) => {
  const { fields, handleFieldChange } = useFormFields<DeployParcelNFTProxyFields>({
    name: '',
    symbol: '',
  });

  const logicContractAddress = findLogicContractByType(wallet.network.key, 'ParcelNFT')?.address;
  if (!logicContractAddress) {
    return null;
  }

  return (
    <>
      <SectionTitle>ParcelNFT Proxy</SectionTitle>
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
        wallet={wallet}
        transactionRequest={buildCreateParcelNFTTransactionRequest(logicContractAddress, {
          name: fields.name,
          symbol: fields.symbol,
        })}
        findExistingContractAddress={undefined}
        onDeploy={undefined}
        onDeployed={undefined}
      />
    </>
  );
};
export default DeployParcelNFTProxy;
