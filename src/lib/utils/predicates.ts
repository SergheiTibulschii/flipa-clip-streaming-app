import { Entity, RouterHandleType } from '../types';

export const hadRouterHandle = (
  handle?: unknown
): handle is RouterHandleType => {
  return typeof handle === 'object' && handle !== null;
};

export const hasRouterData = (data?: unknown): data is Entity => {
  return (
    typeof data === 'object' &&
    Array.isArray(data) &&
    data !== null &&
    data.length > 0
  );
};
