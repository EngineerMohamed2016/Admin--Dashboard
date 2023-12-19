import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import AllCharts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

ReactFC.fcRoot(FusionCharts, AllCharts, FusionTheme);

const data = [
    {
        label: '2018',
        value: '700000'
    },
    {
        label: '2019',
        value: '3000000'
    },

    {
        label: '2020',
        value: '900000'
    },

    {
        label: '2021',
        value: '2700000'
    },

    {
        label: '2022',
        value: '800000'
    },

    {
        label: '2023',
        value: '3400000'
    },
]

const AreaChart = ({ bgColor }) => {
    const chartConfigs = {
        type: "area2d",
        width: "100%",
        height: '100%',
        dataFormat: "json",

        dataSource: {
            chart: {
                caption: "Yearly Sales Statistics (Demo)",
                captionAlignment: 'center',
                captionFontColor: "#ff0000",
                captionFontBold: 0,
                captionFontSize: 17,
                captionFont: "Roboto Flex",
                xAxisName: 'Year',
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
                paletteColors: "#5b21b6",
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

export default AreaChart;
