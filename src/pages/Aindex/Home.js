import React, { memo } from 'react';
import { Row, Col, Icon, Tooltip } from 'antd';
import { FormattedMessage } from 'umi/locale';
import styles from './Aindex.less';
import { ChartCard, MiniArea, MiniBar, MiniProgress, Field } from '@/components/Charts';
import Trend from '@/components/Trend';
import numeral from 'numeral';
import Yuan from '@/utils/Yuan';

const topColResponsiveProps = {
  xs: 24,
  sm: 12,
  md: 12,
  lg: 12,
  xl: 6,
  style: { marginBottom: 24 },
};
const Home = memo(({ loading, radarData }) => ( 
    <Row gutter={24}>
        <Col {...topColResponsiveProps}>
            <ChartCard >
                <div>
                    <Trend flag="up" style={{ marginRight: 16 }}>
                    <FormattedMessage id="app.aindex.week" defaultMessage="Weekly Changes" />
                    <span className={styles.trendTexts}>12%</span>
                    </Trend>
                    <Trend flag="down">
                    <FormattedMessage id="app.aindex.day" defaultMessage="Daily Changes" />
                    <span className={styles.trendText}>11%</span>
                    </Trend>
                </div>
            </ChartCard>
        </Col>
        <Col {...topColResponsiveProps}>
            <div className={styles.totalnumber}>
                <div className="aindex-info">
                    <div className="aindex-Total-number">商户总数</div>
                    <div className="aindex-number">
                    </div>
                    {/* <span> </span> */}
                </div>
            </div>
        </Col>
        <Col {...topColResponsiveProps}>
            <ChartCard >
                <Trend flag="up" style={{ marginRight: 16 }}>
                <FormattedMessage id="app.aindex.week" defaultMessage="Weekly Changes" />
                <span className={styles.trendTextss}>12%</span>
                </Trend>
                <Trend flag="down">
                <FormattedMessage id="app.aindex.day" defaultMessage="Daily Changes" />
                <span className={styles.trendText}>11%</span>
                </Trend>
            </ChartCard>
        </Col>
    </Row>
  ));
  
  export default Home;