import { useState, useEffect } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Label } from "recharts";
import { Stack, Typography } from "@mui/material";
import { useZTheme } from "../../../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { useZGlobalVar } from "../../../../stores/useZGlobalVar";

export const TopGraphic = () => {
  const [isLoading] = useState(false);
  const [diskUsage, setDiskUsage] = useState(0);
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const { currentIdVM: vmId, currentVMName: vmName } = useZGlobalVar();

  // Dados mocados de uso de disco
  useEffect(() => {
    const generateMockDiskUsage = () => {
      const baseValue = 0.3 + ((vmId || 1) * 0.1); // Valor base baseado no ID da VM
      const variation = Math.sin(Date.now() / 60000) * 0.2; // Variação lenta
      return Math.max(0.1, Math.min(0.95, baseValue + variation));
    };

    setDiskUsage(generateMockDiskUsage());
    
    // Atualiza dados a cada 30 segundos
    const interval = setInterval(() => {
      setDiskUsage(generateMockDiskUsage());
    }, 30000);

    return () => clearInterval(interval);
  }, [vmId]);

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

  const valueColor =
    diskUsage < 0.6
      ? theme[mode].ok
      : diskUsage < 0.85
        ? theme[mode].warning
        : theme[mode].danger;

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
              data={generateGaugeData(diskUsage)}
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
              {generateGaugeData(diskUsage).map((_entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index] || "#ccc"} />
              ))}
              <Label
                value={`${(diskUsage * 100).toFixed(2)}%`}
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
