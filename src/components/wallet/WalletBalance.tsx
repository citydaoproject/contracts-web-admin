import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useWallet } from '../../hooks/wallet';
import BigNumberFormat from '../common/typography/BigNumberFormat';

const WalletBalance = () => {
  const theme = useTheme();
  const margin = theme.spacing(1);

  const { wallet } = useWallet();

  if (!wallet) {
    return null;
  }

  const { address, nativeCurrencyBalance, network } = wallet;

  return (
    <Typography variant="subtitle1" style={{ marginLeft: margin, marginRight: margin }}>
      Wallet {address}:{' '}
      <BigNumberFormat
        displayType="text"
        automaticDecimalScale
        amount={nativeCurrencyBalance}
        suffix={' ' + network.nativeCurrency.symbol}
        title={`Wallet ${network.nativeCurrency.name} Balance on ${network.name}`}
      />
    </Typography>
  );
};
export default WalletBalance;
