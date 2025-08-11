import styles from './IrealContentFooter.module.css';

export default function IrealContentFooter() {
    return (
        <div className={styles.footer}>
            <p></p><br/>
            <br/>Made with iReal Pro 
            <a href="https://www.irealpro.com"><img src="https://www.irealb.com/forums/images/images/misc/ireal-pro-logo-50.png" width="25" height="25" alt=""/></a>
            <br/><br/><span className={styles.help}>‐iOS: 共有/エクスポートをタップ-&gt; iReal Pro を選択 <br />‐Mac：.htmlファイルをドック内のIreal Proアプリのアイコンへドラッグして下さい。</span><br/>
        </div>
    );
}