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
    VictoryAxis
} from "victory";

export const IssuePie = () => {
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

    return (
        <section>
            <h4>Соотношение статусов задач</h4>
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
