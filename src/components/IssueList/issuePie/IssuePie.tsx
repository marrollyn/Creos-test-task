import { useSelector, useDispatch } from "react-redux";
import { getIssuesSelector, fetchIssue } from "../../../slice/issueSlice";
import { AppDispatch } from "../../../store/store";
import { useEffect } from "react";
import { VictoryPie, LineSegment } from "victory";
import { useTranslation } from "react-i18next";
import style from './IssuePie.module.css'

export const IssuePie = () => {
    const dispatch = useDispatch<AppDispatch>();
    const issues = useSelector(getIssuesSelector);
    const { t } = useTranslation();

    useEffect(() => {
        if (!issues.length) {
            dispatch(fetchIssue());
        }
    }, []);

    const issuesDone = issues.filter((element) => element.status === "Done");

    const issuesNew = issues.filter((element) => element.status === "New");

    const InProgress = issues.filter(
        (element) => element.status === "In Progress"
    );

    return (
        <section className={style.issue_pie__container}>
            <h3>{t("IssuePie.header")}</h3>
            <VictoryPie
                colorScale={["tomato", "orange", "gold"]}
                data={[
                    {
                        x: ` ${Math.round(InProgress.length / (issues.length / 100))} %`,
                        y: InProgress.length,
                    },
                    {
                        x: ` ${Math.round(issuesDone.length / (issues.length / 100))} %`,
                        y: issuesDone.length,
                    },
                    {
                        x: ` ${Math.round(issuesNew.length / (issues.length / 100))} %`,
                        y: issuesNew.length,
                    },
                ]}
                width={400}
                height={300}
                labelIndicator={
                    <LineSegment
                        style={{ stroke: "red", strokeDasharray: 1, fill: "none" }}
                    />
                }
                labelIndicatorOuterOffset={5}
                style={{
                    labels: {
                        fill: "tomato",
                    },
                }}
            />
            <article className={style.issue_pie__label}>
                <p>
                    {t("IssuePie.new")} - {Math.round(issuesNew.length / (issues.length / 100))} %
                </p>
                <p>
                    {t("IssuePie.inProgress")} - {Math.round(InProgress.length / (issues.length / 100))} %
                </p>
                <p>
                    {t("IssuePie.done")} - {Math.round(issuesDone.length / (issues.length / 100))} %
                </p>
            </article>
        </section>
    );
};
