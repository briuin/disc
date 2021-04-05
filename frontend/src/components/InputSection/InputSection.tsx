import React from 'react';
import styles from './InputSection.module.scss';

const InputSection: React.FC = (props) => (
  <div className={styles.InputSection}>
    {props.children}
  </div>
);

export default InputSection;
