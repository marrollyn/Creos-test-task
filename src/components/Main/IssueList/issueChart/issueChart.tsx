import { useSelector, useDispatch } from "react-redux";
import { getIssuesSelector, fetchIssue } from "../../../../slice/issueSlice";
import { AppDispatch } from "../../../../store/store";
import { useEffect } from "react";

import {
    VictoryPie,
    VictoryChart,
    VictoryTheme,
    VictoryBar,
    VictoryHistogram,
    VictoryStack,
    VictoryAxis,
    VictoryLabel,
    VictoryVoronoiContainer
} from "victory";


const listeningData = [{ day: new Date(2020, 3, 1), genre: 'hip-hop' },
    { day: new Date(2020, 4, 1), genre: 'rock' },
    { day: new Date(2020, 5, 1), genre: 'dance' },
    { day: new Date(2020, 6, 1), genre: 'classic' },
    ]

const groupedData = _.groupBy(listeningData, ({ genre }) => genre);

const sharedAxisStyles = {
    tickLabels: {
        fontSize: 13
    },
    axisLabel: {
        padding: 39,
        fontSize: 13,
        fontStyle: "italic"
    }
};

export const issueChart = () => {
    return (
        <VictoryChart
            height={450}
            scale={{ x: "time" }}
            // containerComponent={
            //     <VictoryVoronoiContainer
            //         style={{}}
            //         labels={({ datum }) =>
            //             datum.y > 0 ? `${datum.y} ${datum.binnedData[0].genre} songs` : null
            //         }
            //     />
            // }
        >
            <VictoryLabel
                x={225}
                y={25}
                textAnchor="middle"
                text="Songs listened to in 2020"
            />

            <VictoryStack
                colorScale={[
                    "#003f5c",
                    "#2f4b7c",
                    "#665191",
                    "#a05195",
                    "#d45087",
                    "#f95d6a",
                    "#ff7c43",
                    "#ffa600"
                ]}
            >
                {Object.entries(groupedData).map(([key, dataGroup]) => {
                    return (
                        <VictoryHistogram
                            // data={dataGroup}
                            // key={key}
                            x="day"
                            binSpacing={8}
                            style={{
                                data: { strokeWidth: 0 }
                            }}
                        />
                    );
                })}
            </VictoryStack>

            <VictoryAxis
            //     tickCount={12}
            //     tickFormat={date => date.function toLocaleString() {[native code]}("default", {month: "short" })}
            // style={sharedAxisStyles}
      />

            <VictoryAxis
                // dependentAxis
                // label="Total # of Songs" 
                // style={sharedAxisStyles}
            />
        </VictoryChart>
    );
};
