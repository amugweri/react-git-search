// STEP 1 - Include Dependencies
// Include react
import React from "react";
import ReactDOM from "react-dom";

// Include the react-fusioncharts component
import ReactFC from "react-fusioncharts";

// Include the fusioncharts library
import FusionCharts from "fusioncharts";

// Include the chart type
import Chart from "fusioncharts/fusioncharts.charts";

// Include the theme as fusion
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";

// Adding the chart and theme as dependency to the core fusioncharts
ReactFC.fcRoot(FusionCharts, Chart, FusionTheme);

// STEP 2 - Chart Data
// const chartData = [
//   {
//     label: "HTML",
//     value: "13"
//   },
//   {
//     label: "CSS",
//     value: "23"
//   },
//   {
//     label: "Javascript",
//     value: "80"
//   }
  
// ];

// STEP 3 - Creating the JSON object to store the chart configurations

const ChartComponent =({data})=> {
  const chartConfigs = {
    type: "column3d", // The chart type
    width: "400", // Width of the chart
    height: "400", // Height of the chart
    dataFormat: "json", // Data type
    dataSource: {
      // Chart Configuration
      chart: {
        //Set the chart caption
        caption: "Most Popular",
        yAxisName: " Stars",
        xAxisName:"Repos",
        yAxisNameFontSize: "16px",
        xAxisNameFontSize: "16px",


      },
      // Chart Data
      data
    }
  };
  
  return (<ReactFC {...chartConfigs} />);


}

// // STEP 4 - Creating the DOM element to pass the react-fusioncharts component
// class App extends React.Component {
//   render() {
//     return (<ReactFC {...chartConfigs} />);
//   }


export default ChartComponent;