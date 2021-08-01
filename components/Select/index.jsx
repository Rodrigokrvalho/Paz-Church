import styles from './Select.module.css'

export const Select = ({ name, label, onChange, value, options}) => {


        
        return (
            <div className={styles.question}>
        <label htmlFor={name} className={styles.description}>{label}</label>
        <select
            onChange={onChange}
            name={name}
            id={name}
            value={value}>

            {options.map((option, index) => {
                return(
                    <option key={index} value={option.value}>{option.label}</option>
                    )
            })}
        </select>
    </div>
    )
}