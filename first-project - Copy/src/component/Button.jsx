import styles from './Button.module.css'
export default function Button({children , btnStyle,existClick}) {
    return (
        <button className={btnStyle} onClick={existClick}>{children}</button>
    )
}