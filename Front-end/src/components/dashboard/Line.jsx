import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import AllCharts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

ReactFC.fcRoot(FusionCharts, AllCharts, FusionTheme);

const LineChart = ({ data, bgColor }) => {
    const chartConfigs = {
        type: "line",
        width: "100%",
        height: '100%',
        dataFormat: "json",

        dataSource: {
            chart: {
                caption: "Weekly Sales Statistics (Real time)",
                captionAlignment: 'center',
                captionFontColor: "#ff0000",
                captionFontBold: 0,
                captionFontSize: 17,
                captionFont: "Roboto Flex",
                xAxisName: 'Day',
                yAxisName: 'Slaes',
                xAxisNameFont: 'Roboto Flex',
                yAxisNameFont: 'Roboto Flex',
                plottooltext: "$value$ | $label",
                baseFont: 'open sans',
                baseFontSize: 14,
                toolTipPadding: '3',
                toolTipColor: '#ffffff',
                toolTipBgColor: '#000000',
                tooltipbgalpha: '100',
                toolTipBorderColor: '#fffffff',
                tooltipBorderAlpha: '100',
                tooltipPosition: 'top',
                paletteColors: "#b91c1c",
                useDataPlotColorForLabels: '1', // in bar
                smartLineAlpha: 0,
                bgColor: bgColor,
                showBorder: 0,
                borderColor: '#64748b',
                borderThickness: '1',
                borderAlpha: '100',
                bgAlpha: '100',
                theme: 'candy',
                numberprefix: "$",
                showValues: 1,
                valueFontColor: '#ff0000',
            },

            data,
        },
    };

    return <div style={{ width: '98%' }}><ReactFC {...chartConfigs} /></div>;
};

export default LineChart;
