import { OptionsObject, SnackbarKey, useSnackbar } from 'notistack';
import * as React from 'react';
import { limitLength } from '../utils/strings';

export interface ErrorsHook {
  showError: (error: Error, options?: OptionsObject) => ErrorKey;
  clearError: (errorKey?: ErrorKey) => void;
}

export type ErrorKey = SnackbarKey;

const standardOptions: OptionsObject = {
  autoHideDuration: 10_000,
  variant: 'error',
};

export const useErrors = (defaultOptions?: OptionsObject): ErrorsHook => {
  const [errorKey, setErrorKey] = React.useState<ErrorKey | undefined>(undefined);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  return {
    showError: (error: Error, options?: OptionsObject): ErrorKey => {
      const errorMessage = extractErrorMessage(error);
      console.error('Error: ', errorMessage);
      console.error(error);
      const newErrorKey = enqueueSnackbar(limitLength(errorMessage, 200), {
        ...standardOptions,
        ...defaultOptions,
        ...options,
      });
      setErrorKey((prevErrorKey) => prevErrorKey || newErrorKey);
      return newErrorKey;
    },

    clearError: (newErrorKey?: ErrorKey) => {
      const theErrorKey = newErrorKey || errorKey;
      if (!theErrorKey) {
        console.debug('no error key to clear');
        return;
      }

      closeSnackbar(theErrorKey);

      if (!newErrorKey) {
        setErrorKey(undefined);
      }
    },
  };
};

export interface HasErrorHandler {
  onError?: (error: Error) => void;
}

export const extractErrorMessage = (error: Error): string => {
  if ('error' in error && 'message' in error['error']) {
    return error['error']['message'];
  }

  return error.message;
};
