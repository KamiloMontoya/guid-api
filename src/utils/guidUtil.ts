import { v4 } from 'uuid';

export const generateGuid = (): string => {
  return v4().replace(/-/g, '').toUpperCase();
};

export const isValidGuid = (guid: string) => {
  const guidRegex = /^[A-F0-9]{32}$/;
  return guidRegex.test(guid);
};
