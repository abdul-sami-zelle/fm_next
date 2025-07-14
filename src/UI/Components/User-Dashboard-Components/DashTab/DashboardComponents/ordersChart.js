import React, { useEffect } from "react";
import Chart from "react-apexcharts";

const BarChart = ({data}) => {
  const [chartOptions, setChartOptions] = React.useState(null)
    // series: [
    //   {
    //     data: data?.summary?.orderStats.map(item => item.count),
    //   },
    //   // {
    //   //   data: [53, 32, 33, 52, 13, 44, 32],
    //   // },
    // ],
    // options: {
    //   chart: {
    //     type: "bar",
    //     background: "#fff",
    //     toolbar: {
    //     show: false, // This will remove the hamburger menu
    //   },
    //   },
    //   plotOptions: {
    //     bar: {
    //       horizontal: false,
    //       borderRadius: 10, // Adjust radius of the bars
    //       dataLabels: {
    //         position: "top",
    //       },
    //     },
    //   },
    //   colors: ["var(--tertiary-color)", "#76A7D4"], // Colors for the bars
    //   states: {
    //     hover: {
    //       enable: false
    //       // filter: {
    //       //   type: "lighten",
    //       //   value: 0.2,
    //       // },
    //     },
    //   },
    //   stroke: {
    //     show: true,
    //     width: 1,
    //     colors: ["#fff"],
    //   },
    //   grid: {
    //     show: true,
    //     borderColor: "#e0e0e0", // Color of the grid lines
    //     strokeDashArray: 4, // Dash array for dotted lines
    //     position: "back",
    //   },
    //   tooltip: {
    //     shared: true,
    //     intersect: false,
    //   },
    //   xaxis: {
    //     // categories: [2001, 2002, 2003, 2004, 2005, 2006, 2007],
    //     categories: data?.summary?.orderStats.map(item => item.date),
    //   },
    // },

    useEffect(() => {
    if (data?.summary?.orderStats?.length > 0) {
      setChartOptions({
        series: [
          {
            name: "Order Count",
            data: data.summary.orderStats.map(item => item.count),
          },
        ],
        options: {
          chart: {
            type: "bar",
            columnWidth: "20px",
            background: "#fff",
            toolbar: {
              show: false,
            },
          },
          plotOptions: {
            bar: {
              horizontal: false,
              borderRadius: 5,
              columnWidth: "30px",
              dataLabels: {
                position: "top",
              },
            },
          },
          colors: ["#595959"],
          states: {
            hover: {
              enable: false,
            },
          },
          stroke: {
            show: true,
            width: 1,
            colors: ["#fff"],
          },
          grid: {
            show: true,
            borderColor: "#e0e0e0",
            columnWidth: "20px",
            strokeDashArray: 4,
            position: "back",
          },
          tooltip: {
            shared: true,
            intersect: false,
          },
          xaxis: {
            categories: data.summary.orderStats.map(item => item.date),
          },
        },
      });
    }
  }, [data]);

  if (!chartOptions) return <div>Loading chart...</div>;

  return (
    <div className="bar_chart_order_stats">
      <h3>Order Statistics</h3>
      <Chart
        options={chartOptions.options}
        series={chartOptions.series}
        type="bar"
        height={430}
      />
    </div>
  );
};

export default BarChart;
