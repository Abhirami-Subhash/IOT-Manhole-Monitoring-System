import React from 'react'
import styles from './card.module.css'

const Card = (props) => {

  const { unit, label, threshold } = props
  let { value } = props
  const title = label[0].toUpperCase()  

  const valueClasses = [styles.value]
  const titleClasses = [styles.title]

  if (label === "Distance") {
    if (value <= threshold) {
      valueClasses.push(styles.error)
      titleClasses.push(styles.error)
    }
  } else {
    if (value >= threshold) {
      valueClasses.push(styles.error)
      titleClasses.push(styles.error)
    }
  }

  if (label === 'Tilt') {
    if (value === 0) {
      value = 'No Tilt'
    } else value = 'Tilted'
  }

  const valueStyles = valueClasses.join(' ')
  const titleStyles = titleClasses.join(' ')

  return (
    <div className={styles.background}>
      <div className={titleStyles}>{title}</div>
      <div className={styles.labelDiv}>
        <span className={valueStyles}>{value}</span>
        {unit && <span className={valueStyles}>{` ${unit}`}</span>}
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  )
}

export default Card