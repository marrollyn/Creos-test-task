import { useSelector, useDispatch } from "react-redux";
import { getIssuesSelector, fetchIssue } from "../../../slice/issueSlice";
import { AppDispatch } from "../../../store/store";
import { useEffect } from "react";
import {
    VictoryPie,
    VictoryChart,
    VictoryTheme,
    VictoryBar,
    VictoryHistogram,
} from "victory";

export const IssueList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const issues = useSelector(getIssuesSelector);

    useEffect(() => {
        if (!issues.length) {
            dispatch(fetchIssue());
        }
    }, []);
    // console.log(issues);

    const issuesDone = issues.filter((element) => element.status === "Done");

    const issuesNew = issues.filter((element) => element.status === "New");

    const InProgress = issues.filter(
        (element) => element.status === "In Progress"
    );

    console.log(issuesDone);

    // const dataVictoryPie = {}

    return (
        <section>
            <VictoryChart theme={VictoryTheme.material} domainPadding={10}>
                <VictoryBar
                    style={{ data: { fill: "#c43a31" } }}
                // data={sampleData}
                />
            </VictoryChart>
            <VictoryChart domainPadding={10}>
                <VictoryHistogram
                    style={{ data: { fill: "#c43a31" } }}
                // data={issuesDone.length}
                />
            </VictoryChart>
            <h3>Соотношение статусов задач</h3>
            <VictoryPie
                colorScale={["tomato", "orange", "gold"]}
                data={[
                    {
                        x: `Done - ${Math.round(
                            issuesDone.length / (issues.length / 100)
                        )} %`,
                        y: issuesDone.length,
                    },
                    {
                        x: `New - ${Math.round(
                            issuesNew.length / (issues.length / 100)
                        )} %`,
                        y: issuesNew.length,
                    },
                    {
                        x: `In Progress - ${Math.round(
                            InProgress.length / (issues.length / 100)
                        )} %`,
                        y: InProgress.length,
                    },
                ]}
                width={500}
                height={400}
            />
            <h3>{issues.length}</h3>
            {issues.map((issue) => (
                <article key={issue.id}>
                    <h4>{issue.project}</h4>
                    <h5>Project № {issue.id}</h5>
                    <p>{issue.status}</p>
                </article>
            ))}
        </section>
    );
};
