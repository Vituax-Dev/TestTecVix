import { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";
import { Stack, Typography } from "@mui/material";
import { useZTheme } from "../../../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { IFormatData } from "../../../../types/socketType";
import { useZGlobalVar } from "../../../../stores/useZGlobalVar";
import { EmptyFeedBack } from "./EmptyFeedBack";

export const TopGraphic = () => {
  const [isLoading] = useState(false);
  const [chartData] = useState<IFormatData[]>([]);
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();

  const COLORS = [
    theme[mode].ok,
    theme[mode].grayLight,
    theme[mode].warning,
    theme[mode].grayLight,
    theme[mode].danger,
    theme[mode].grayLight,
  ];

  const MAX_PERCENTAGE = 1;

  const generateGaugeData = (value: number) => {
    if (value < 0.6) {
      return [
        { value },
        { value: MAX_PERCENTAGE * 0.6 - value },
        { value: MAX_PERCENTAGE - MAX_PERCENTAGE * 0.75 },
        { value: 0 },
        { value: MAX_PERCENTAGE - MAX_PERCENTAGE * 0.85 },
      ];
    }

    if (value < 0.85) {
      return [
        { value: 0 },
        { value: 0 },
        { value },
        { value: MAX_PERCENTAGE - MAX_PERCENTAGE * 0.75 - (value - 0.6) },
        { value: MAX_PERCENTAGE - MAX_PERCENTAGE * 0.85 },
      ];
    }

    return [
      { value: 0 },
      { value: 0 },
      { value: 0 },
      { value: 0 },
      { value },
      { value: MAX_PERCENTAGE - value },
    ];
  };

  const cpuUsage = (chartData[chartData.length - 1]?.value || 0) / 100;
  const valueColor =
    cpuUsage < 0.6
      ? theme[mode].ok
      : cpuUsage < 0.85
        ? theme[mode].warning
        : theme[mode].danger;

  const { currentVMName: vmName } = useZGlobalVar();

  if (!chartData.length) return <EmptyFeedBack />;

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <Typography
        sx={{
          paddingLeft: "20px",
          fontSize: "12px",
          alignSelf: "flex-start",
          color: theme[mode].primary,
        }}
      >
        {`${t("graphics.diskUsage")} - ${vmName}`}
      </Typography>

      <ResponsiveContainer width="100%" height="100%">
        {!isLoading ? (
          <PieChart>
            <Pie
              data={generateGaugeData(cpuUsage)}
              startAngle={180}
              endAngle={0}
              innerRadius="85%"
              outerRadius="120%"
              dataKey="value"
              stroke="none"
              isAnimationActive={true}
              animationDuration={2000}
              cx="50%"
              cy="75%"
            >
              {/* Mapeia as cores do gráfico */}
              {generateGaugeData(cpuUsage).map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index] || "#ccc"} />
              ))}
              <Label
                value={`${(cpuUsage * 100).toFixed(2)}%`}
                position="center"
                style={{
                  fill: valueColor,
                  fontSize: "14px",
                  fontWeight: "bold",
                  textAnchor: "middle",
                }}
              />
            </Pie>
          </PieChart>
        ) : (
          <></>
        )}
      </ResponsiveContainer>
    </Stack>
  );
};
