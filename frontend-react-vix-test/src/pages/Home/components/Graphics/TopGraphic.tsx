import { useState, useEffect, useRef } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";
import { Stack, Typography } from "@mui/material";
import { useZTheme } from "../../../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { useZGlobalVar } from "../../../../stores/useZGlobalVar";
import {
  useZVMChartData,
  generateNextValue,
} from "../../../../stores/useZVMChartData";

export const TopGraphic = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const { currentIdVM, currentVMName: vmName } = useZGlobalVar();
  const { getVMChartData, updateDiskData } = useZVMChartData();
  const [diskUsage, setDiskUsage] = useState<number>(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Carrega dados da VM atual e inicia atualização (disco cresce lentamente)
  useEffect(() => {
    if (!currentIdVM) {
      setDiskUsage(0);
      return;
    }

    // Carrega dados existentes da VM
    const vmData = getVMChartData(currentIdVM);
    setDiskUsage(vmData.disk);

    // Inicia geração de novos dados a cada 5 segundos (disco muda mais devagar)
    intervalRef.current = setInterval(() => {
      const currentData = getVMChartData(currentIdVM);
      // Disco cresce lentamente com pequena variação
      const newValue = generateNextValue(currentData.disk, 20, 85, 2);

      updateDiskData(currentIdVM, newValue);
      setDiskUsage(newValue);
    }, 5000);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [currentIdVM]);

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

  const normalizedDisk = diskUsage / 100;
  const valueColor =
    normalizedDisk < 0.6
      ? theme[mode].ok
      : normalizedDisk < 0.85
        ? theme[mode].warning
        : theme[mode].danger;

  // if (!diskUsage) return <EmptyFeedBack />;

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
        <PieChart>
          <Pie
            data={generateGaugeData(normalizedDisk)}
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
            {generateGaugeData(normalizedDisk).map((_entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index] || "#ccc"} />
            ))}
            <Label
              value={`${diskUsage.toFixed(2)}%`}
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
      </ResponsiveContainer>
    </Stack>
  );
};
