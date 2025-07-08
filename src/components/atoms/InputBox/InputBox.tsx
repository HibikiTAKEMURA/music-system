import styles from './InputBox.module.css';

type InputBoxProps = {
  children: React.ReactNode;
};

export default function InputBox({children}: InputBoxProps) {
  return (
    <div className={styles.inputBox}>
        {children}
    </div>
  );
}