import { PropsWithChildren } from 'react';
import styles from './styles/index.module.scss';

type ContainerProps = PropsWithChildren<unknown>;

export const Container = ({ children }: ContainerProps) => {
  return <div className={styles.container}>{children}</div>;
};
