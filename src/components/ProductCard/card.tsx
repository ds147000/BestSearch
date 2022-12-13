import { Card, CardActions, CardContent, Typography } from "@mui/material";
import { useEffect, useRef } from "react";
import { Product } from "../../api/search";
import * as echarts from "echarts";
import type { ECharts } from "echarts";
import styles from "./styles.module.scss";

const colors = ["rgb(160, 199, 181)", "rgb(155, 186, 217)"];

const ProductCard: React.FC<Product> = ({
  name,
  search_msv,
  growth,
  update_dt,
}) => {
  const myChart = useRef<ECharts>();
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef?.current) return;

    myChart.current = echarts.init(chartRef.current!);
  }, [chartRef]);

  console.log(search_msv);

  useEffect(() => {
    if (!myChart.current) return;
    myChart.current.clear();

    const color = colors[Math.floor(Math.random() * colors.length)];
    const data = search_msv.map((item) => item.sv);

    myChart.current.setOption({
      tooltip: { trigger: "axis" },
      legend: false,
      grid: {
        top: 0,
        left: -5,
        right: -5,
        bottom: 0,
      },
      xAxis: {
        type: "category",
        data: search_msv.map((item) => item.date),
        show: false,
      },
      yAxis: [
        {
          type: "value",
          show: false,
        },
      ],
      series: [
        {
          name: "sv",
          data: data,
          type: "line",
          smooth: true,
          color,
          areaStyle: {
            color,
          },
        },
      ].filter(Boolean),
    });
  }, [search_msv]);

  return (
    <Card sx={{ width: 200, margin: 2, display: "inline-block" }}>
      <CardContent style={{ paddingBottom: 0 }}>
        <Typography variant="h5" component="div">
          {name}
        </Typography>
        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          Growth {growth || 0} %
        </Typography>
      </CardContent>
      <div className={styles.canvas} ref={chartRef} />
      <CardActions>
        <div className={styles.time}>{update_dt}</div>
      </CardActions>
    </Card>
  );
};

export default ProductCard;
