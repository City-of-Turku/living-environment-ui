import React, { Component } from 'react';
import PropTypes from 'prop-types';

import styles from './BudgetingTargetMap.less';
import ContentWrapper from '../../../containers/ContentWrapper';
import Map from '../containers/Map';

class BudgetingTargetMap extends Component { // eslint-disable-line react/prefer-stateless-function

  static getTargetUserData(budgetingTask) {
    return budgetingTask.targets.map((target, index) => ({
      lat: target.point[1],
      lng: target.point[0],
      id: index,
      valid: true,
      selectedTarget: {
        icon: target.icon,
      }
    }));
  }

  static sectionTargetMapHasAnswers(section) {
    return section.sectionTargetMap.reduce(
      (acc, target) => acc + BudgetingTargetMap.getTargetUserData(target).length, 0);
  }

  render() {
    const { report } = this.props;
    if (!((report || {}).sections || []).length) {
      return null;
    }
    return (<ContentWrapper id="budgetingTargetMap">
      <h2>Karttakohteet</h2>
      {
        report.sections.map(
          (section, sectionIndex) => (BudgetingTargetMap.sectionTargetMapHasAnswers(section) ?
            // eslint-disable-next-line react/no-array-index-key
            (<div key={sectionIndex}>
              <h3>{section.title}</h3>
              {
                section.sectionTargetMap.map(
                  (target, index) => (BudgetingTargetMap.getTargetUserData(target).length ?
                    // eslint-disable-next-line react/no-array-index-key
                    (<div key={index}>
                      <h4>{target.name}</h4>
                      <Map
                        className={styles.map}
                        layers={['Opaskartta']}
                        mask={report.area}
                        minLat={60.1}
                        minLong={21.5}
                        minZoom={9}
                        maxLat={61.0}
                        maxLong={23.2}
                        readOnly
                        targetUserData={BudgetingTargetMap.getTargetUserData(target)}
                        task={null}
                        url="https://opaskartta.turku.fi/TeklaOGCWeb/WMS.ashx"
                      />
                    </div>) : null)
                )
              }
              {section.question}
            </div>) : null))
      }
    </ContentWrapper>);
  }
}

BudgetingTargetMap.propTypes = {
  report: PropTypes.shape({
    area: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.number)),
    sections: PropTypes.arrayOf(PropTypes.shape({
      sectionTargetMap: PropTypes.arrayOf(PropTypes.shape({
        name: PropTypes.string,
        targets: PropTypes.arrayOf(PropTypes.shape({
          icon: PropTypes.string,
          name: PropTypes.string,
          point: PropTypes.arrayOf(PropTypes.number),
        })),
      })),
    })),
    title: PropTypes.string,
  }).isRequired,
};


export default BudgetingTargetMap;
