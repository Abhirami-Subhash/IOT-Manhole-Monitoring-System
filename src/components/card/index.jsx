import React from 'react'
import styles from './card.module.css'

const Card = (props) => {

  const { unit, label } = props
  let { value } = props
  const title = label[0].toUpperCase()

  if (label === 'Tilt') {
    if (value === 0) {
      value = 'No Tilt'
    } else value = 'Tilted'
  }

  return (
    <div className={styles.background}>
      <div className={styles.title}>{title}</div>
      <div className={styles.labelDiv}>
        <span className={styles.value}>{value}</span>
        {unit && <span className={styles.value}>{` ${unit}`}</span>}
      </div>
      <div className={styles.label}>{label}</div>
    </div>
  )
}

export default Card