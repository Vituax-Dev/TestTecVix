import { Stack } from "@mui/material";
import { ResponsiveChoropleth } from "@nivo/geo";
import { worldCountries } from "../../../../utils/worldCountries";
import { geographyData as data } from "../../../../utils/geographyData";
import { useZTheme } from "../../../../stores/useZTheme";
import { shadow } from "../../../../utils/shadow";

export const Map = () => {
  const { theme, mode } = useZTheme();
  return (
    <Stack
      className="h-full w-full"
      sx={{
        overflow: "auto",
        flexDirection: "row",
        justifyContent: "flex-start",
        backgroundColor: theme[mode].light,
        padding: "16px",
      }}
    >
      <Stack
        className="h-full w-full"
        sx={{
          borderRadius: "16px",
          overflow: "hidden",
          boxShadow: `0px 4px 4px 0px ${shadow(mode)}`,
        }}
      >
        <ResponsiveChoropleth
          projectionType="mercator"
          graticuleLineWidth={0.25}
          isInteractive={true}
          onMouseEnter={() => {}}
          onMouseMove={() => {}}
          onMouseLeave={() => {}}
          onClick={() => {}}
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: "red",
                },
              },
              legend: {
                text: {
                  fill: "red",
                },
              },
              ticks: {
                line: {
                  stroke: "red",
                  strokeWidth: 1,
                },
                text: {
                  fill: "red",
                },
              },
            },
            legends: {
              text: {
                fill: "red",
              },
            },
          }}
          data={data}
          domain={[0, 1000000]}
          features={worldCountries.features}
          margin={{ top: 0, right: 0, bottom: 0, left: 0 }}
          projectionScale={200}
          projectionTranslation={[0.45, 0.55]}
          projectionRotation={[15, 0, 0]}
          fillColor="#ccc"
          borderWidth={1}
          borderColor={theme[mode].shadow}
          enableGraticule={true}
          graticuleLineColor="#666666"
          unknownColor="#fff"
          valueFormat=".2s"
          legends={[
            {
              anchor: "bottom-left",
              direction: "column",
              justify: true,
              translateX: 20,
              translateY: -100,
              itemsSpacing: 0,
              itemWidth: 94,
              itemHeight: 18,
              itemDirection: "left-to-right",
              itemTextColor:
                mode === "light"
                  ? theme[mode].black
                  : theme[mode].mainBackground,
              itemOpacity: 0.85,
              symbolSize: 18,
              effects: [
                {
                  on: "hover",
                  style: {
                    itemTextColor: "blue",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </Stack>
    </Stack>
  );
};
