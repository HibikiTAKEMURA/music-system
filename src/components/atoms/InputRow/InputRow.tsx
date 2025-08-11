import styles from './InputRow.module.css';

type InputRowProps = {
  children: React.ReactNode;
};

export default function InputRow({children}: InputRowProps) {
  return (
    <div className={styles.inputRow}>
      {children}
    </div>
  );
}