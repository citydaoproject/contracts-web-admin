import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

export const basePageTitle = 'CityDAO Contracts Admin';

export const usePageTitle = (title?: string, replaceAll: boolean = false) => {
  useEffect(() => {
    if (title) {
      if (replaceAll) {
        document.title = title;
      } else {
        document.title = `${title} - ${basePageTitle}`;
      }
    } else {
      document.title = basePageTitle;
    }
  }, [title, replaceAll]);
};

export type PageParams<Key extends string> = {
  readonly [key in Key]: string;
};

export const usePageParams = <Key extends string>() => {
  const params = useParams<Key>();
  return params as PageParams<Key>;
};
