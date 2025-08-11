import styles from './TableTitle.module.css';

type TableTitleProps = {
  children: React.ReactNode;
};

export default function TableTitle({children}: TableTitleProps) {
  return (
    <p className={styles.tableTitle}>
      {children}
    </p>
  );
}