import styles from './line-wrapper.module.scss';

export const LineWrapper = ({children, className = ''}) => {
  return <div className={`${styles.lineWrapper} ${className}`}>{children}</div>;
};
