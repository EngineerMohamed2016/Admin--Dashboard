import React from "react";
import ReactFC from "react-fusioncharts";
import FusionCharts from "fusioncharts";
import AllCharts from "fusioncharts/fusioncharts.charts";
import FusionTheme from "fusioncharts/themes/fusioncharts.theme.candy";

ReactFC.fcRoot(FusionCharts, AllCharts, FusionTheme);

const DoughnutChart = ({ data, bgColor, showBorder }) => {
    const chartConfigs = {
        type: "doughnut2d",
        width: "100%",
        height: '100%',
        dataFormat: "json",

        dataSource: {
            chart: {
                caption: "Products Statistics",
                captionAlignment: 'center',
                captionFontColor: "#ff0000",
                captionFontBold: 0,
                captionFontSize: 17,
                captionFont: "Roboto Flex",
                plottooltext: "$percentValue | $value $label",
                baseFont: 'open sans',
                baseFontSize: 14,
                toolTipPadding: '3',
                toolTipColor: '#ffffff',
                toolTipBgColor: '#000000',
                tooltipbgalpha: '100',
                toolTipBorderColor: '#fffffff',
                tooltipBorderAlpha: '100',
                paletteColors: ["#ff0000", "#0000FF", "#16a34a", "#581c87"],
                pieRadius: "50%",
                enableRotation: 1,
                labelAlpha: "0",
                smartLineAlpha: 0,
                bgColor: bgColor,
                showBorder: showBorder,
                borderColor: '#64748b',
                borderThickness: '1',
                borderAlpha: '100',
                bgAlpha: '100',
                theme: 'candy',
                showlegend: "1",
                legendposition: "bottom",
                legendBgColor: '#ffffff',
                legendBgAlpha: '0',
                legendNumColumns: 2,
                legendCaptionAlignment: 'center',
                legendItemFontSize: 13,
                numberprefix: "$",
                showValues: 0,
            },

            data,
        },
    };

    return <ReactFC {...chartConfigs} />;
};

export default DoughnutChart;
