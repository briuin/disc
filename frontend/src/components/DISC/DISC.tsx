import React from 'react';
import TitleSection from '../TitleSection/TitleSection.lazy';
import styles from './DISC.module.scss';

const DISC: React.FC = () => {
  const description = (<span style={{color: 'red'}}>*必填</span>)
  return (
  <div className={styles.DISC}>
    <TitleSection title={'DISC人格特質分析'} description={description}></TitleSection>
    <TitleSection title={'DISC人格特質分析'} description={'總共有十題，請依據題目依序選出最像自己、次像自己、有點像自己以及不像自己的選項'}></TitleSection>
  </div>
)
};

export default DISC;
