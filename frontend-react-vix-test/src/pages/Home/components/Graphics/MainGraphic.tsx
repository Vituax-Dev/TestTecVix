import { useState, useEffect } from "react";
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ReferenceLine,
  Area,
  AreaChart,
} from "recharts";
import { Stack, Typography } from "@mui/material";
import { useZTheme } from "../../../../stores/useZTheme";
import { useTranslation } from "react-i18next";
import { useZGlobalVar } from "../../../../stores/useZGlobalVar";
import { IFormatData } from "../../../../types/socketType";
import { EmptyFeedBack } from "./EmptyFeedBack";

export const MainGraphic = () => {
  const { theme, mode } = useZTheme();
  const { t } = useTranslation();
  const { currentIdVM: vmId, currentVMName: vmName } = useZGlobalVar();
  
  const [chartData, setChartData] = useState<IFormatData[]>([]);

  // Dados mocados de uso de CPU (conforme solicitado no README)
  useEffect(() => {
    const generateMockCPUData = (): IFormatData[] => {
      const data: IFormatData[] = [];
      const now = new Date();
      
      for (let i = 29; i >= 0; i--) {
        const time = new Date(now.getTime() - i * 2 * 60 * 1000); // Intervalos de 2 minutos
        const baseValue = 35 + (vmId || 1) * 8; // Valor base baseado no ID da VM
        const variation = Math.cos(i / 4) * 20 + Math.random() * 15; // Variação cossenoidal + ruído
        const value = Math.max(0, Math.min(100, baseValue + variation));
        
        data.push({
          time: time.toLocaleTimeString('pt-BR', { 
            hour: '2-digit', 
            minute: '2-digit' 
          }),
          value: Number(value.toFixed(2))
        });
      }
      
      return data;
    };

    setChartData(generateMockCPUData());
    
    // Atualiza dados a cada 30 segundos
    const interval = setInterval(() => {
      setChartData(generateMockCPUData());
    }, 30000);

    return () => clearInterval(interval);
  }, [vmId]);

  const lastCpuUsage = chartData[chartData.length - 1]?.value || 0;

  const valueColor =
    lastCpuUsage < 70
      ? theme[mode].ok
      : lastCpuUsage < 90
        ? theme[mode].warning
        : theme[mode].danger;

  if (!chartData.length) return <EmptyFeedBack />;

  return (
    <Stack
      sx={{
        width: "100%",
        height: "100%",
      }}
    >
      <Typography
        sx={{
          padding: "2px",
          color: theme[mode].primary,
          fontWeight: "500",
          paddingRight: "24px",
        }}
      >
        {`${t("graphics.cpuUsage")} - ${vmName}`}
        <span style={{ color: theme[mode].gray, fontWeight: "300" }}>
          {" "}
          {t("graphics.currentUse")}{" "}
          <span style={{ color: valueColor }}>{lastCpuUsage.toFixed(3)}%</span>
        </span>
      </Typography>
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={chartData}
          margin={{ top: 20, right: 30, left: 0, bottom: 20 }} // Aumentando o espaço superior e inferior
        >
          <CartesianGrid strokeDasharray="3 3" stroke={theme[mode].gray} />
          <XAxis
            dataKey="time"
            label={{
              value: t("graphics.time"),
              position: "insideBottomRight",
              offset: -5,
              fill: theme[mode].dark, // Cor branca
              fontSize: 10, // Fonte menor
            }}
            tick={{ fill: theme[mode].dark, fontSize: 10 }} // Ticks do eixo X em branco e menores
          />
          <YAxis
            label={{
              value: t("graphics.cpuUsage"),
              angle: -90,
              position: "insideLeft",
              fill: theme[mode].dark,
              fontSize: 10,
            }}
            tick={{ fill: theme[mode].dark, fontSize: 10 }}
            domain={[0, (dataMax: number) => Math.ceil(dataMax * 1.16)]} // Adicionando margem acima do maior valor
          />
          <Tooltip
            formatter={(value) => parseFloat(value as string).toFixed(2)} // Formata para 2 casas decimais
          />
          <Legend />
          <ReferenceLine
            y={70} // Linha amarela de threshold (uso alto acima de 70%)
            stroke="yellow"
            strokeDasharray="3 3"
          />
          <ReferenceLine
            y={90} // Linha vermelha de threshold  (uso critico acima de 90%)
            stroke="red"
            strokeDasharray="3 3"
          />
          <Area
            type="monotone"
            dataKey="value"
            stroke="#8884d8"
            fill="#8884d8"
            dot={false}
            isAnimationActive={false}
            legendType="none" // retira legenda
            // name="CPU Usage (%)" // renomeia a legenda
          />
        </AreaChart>
      </ResponsiveContainer>
    </Stack>
  );
};
