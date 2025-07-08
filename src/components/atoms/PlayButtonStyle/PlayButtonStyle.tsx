import styles from './PlayButtonStyle.module.css';

type PlayButtonStyleProps = {
  children: React.ReactNode;
  onClick?: () => void;
};

export default function PlayButtonStyle({children, onClick}: PlayButtonStyleProps) {
  return (
    <button className={styles.buttonStyle} onClick={onClick}>
        {children}
    </button>
  );
}