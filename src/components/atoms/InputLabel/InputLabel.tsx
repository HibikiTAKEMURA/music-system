import styles from './InputLabel.module.css';

type InputLabelProps = {
  children: React.ReactNode;
  htmlFor?: string;
};

export default function InputLabel({children, htmlFor}: InputLabelProps) {
  return (
    <label className={styles.inputLabel} htmlFor={htmlFor}>
      {children}
    </label>
  );
}