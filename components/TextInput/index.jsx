import styles from './input.module.css'

export const TextInput = ({name, value, onChange, label}) => {

    return (
        <div className={styles.question}>
            <label className={styles.description} htmlFor={name}>{label}</label>
            <input
                onChange={onChange}
                value={value}
                type="text"
                name={name}
                id={name} />
        </div>
    )
}