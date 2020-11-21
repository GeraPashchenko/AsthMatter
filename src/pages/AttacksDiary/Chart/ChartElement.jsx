import React from "react";
import {Chart} from "react-google-charts";
import localization from '../../../localization/localization.json';

function ChartFunc(props) {

  const {data, language} = props;

  const chartData = [[localization.attacksDiary.mainPage.time[language], localization.attacksDiary.mainPage.attackGraphTime[language]], ...data];

  return (
    <Chart
      width={'500px'}
      height={'400px'}
      chartType="ScatterChart"
      loader={<div>Loading Chart</div>}
      data={chartData}
      options={{
        title: localization.attacksDiary.mainPage.attacksStatistics[language],
        hAxis: {title: localization.attacksDiary.mainPage.date[language], minValue: 0, maxValue: 31},
        vAxis: {title: localization.attacksDiary.mainPage.time[language], minValue: 0, maxValue: 24},
        legend: 'none',
      }}
      rootProps={{'data-testid': '1'}}
    />
  )
}

export default ChartFunc;