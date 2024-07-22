import { useSelector, useDispatch } from "react-redux";
import { getIssuesSelector, fetchIssue } from "../../../slice/issueSlice";
import { AppDispatch } from "../../../store/store";
import { useEffect, useState } from "react";
import * as _ from "lodash";
import {
    BarChart,
    Bar,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer,
    YAxis,
    XAxis,
} from "recharts";
import { useTranslation } from "react-i18next";
import style from "./IssueGraph.module.css";

export function IssueGraph() {
    const { t } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const issues = useSelector(getIssuesSelector);

    useEffect(() => {
        if (!issues.length) {
            dispatch(fetchIssue());
        }
    }, []);

    const issuesDone = issues.filter((element) => element.status === "Done");

    const dataWeek = createWeekObg();

    const values = dataWeek.map((item) => item.workWeek);
    const [selectedValue, setSelectedValue] = useState<number>(8);

    const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const value = parseInt(event.target.value, 10);
        setSelectedValue(value);
    };

    function getIssueEndWeek(weekEnd: string) {
        const date = new Date(weekEnd);
        const year = new Date(date.getFullYear(), 0, 0);
        const workWeekNumber = Math.floor(
            (date.valueOf() - year.valueOf() - 10 * 60 * 60 * 1000) /
            (1000 * 60 * 60 * 24 * 7) +
            1
        );
        return workWeekNumber;
    }

    const issuesChartData = issuesDone.map(function (element) {
        if (element.date_finished !== null) {
            return {
                cost: element.received_from_client,
                expenses:
                    element.send_to_account_manager +
                    element.send_to_designer +
                    element.send_to_project_manager,
                profit:
                    element.received_from_client -
                    element.send_to_account_manager -
                    element.send_to_designer -
                    element.send_to_project_manager,
                workWeek: getIssueEndWeek(element.date_finished),
            };
        } else return null;
    });
    type TweekObj = {
        cost: number;
        expenses: number;
        profit: number;
        workWeek: number;
    };

    function createWeekObg() {
        const weekObj = [];
        const currentDate = new Date();
        const currentYear = new Date(currentDate.getFullYear(), 0, 0);
        const currentWorkWeek = Math.floor(
            (currentDate.valueOf() - currentYear.valueOf() - 10 * 60 * 60 * 1000) /
            (1000 * 60 * 60 * 24 * 7) +
            1
        );
        for (let i = 1; i <= currentWorkWeek; i++) {
            const week = {
                cost: 0,
                expenses: 0,
                profit: 0,
                workWeek: i,
            };
            weekObj.push(week);
        }
        return weekObj;
    }

    const mergeIssuesChartData = issuesChartData.reduce(
        (acc: TweekObj[] | null, curr: TweekObj | null) => {
            if (acc === null || curr === null) {
                return null;
            } else {
                const existingItem = acc.find(
                    (item) => item.workWeek === curr.workWeek
                );
                if (existingItem) {
                    existingItem.cost += curr.cost;
                    existingItem.expenses += curr.expenses;
                    existingItem.profit += curr.profit;
                } else {
                    acc.push({ ...curr });
                }
            }
            return acc;
        },
        [] as TweekObj[]
    );

    const resultIssueData = dataWeek.map((item1) => {
        if (mergeIssuesChartData !== null) {
            const item2 = mergeIssuesChartData.find(
                (item2) => item2.workWeek === item1.workWeek
            );
            if (item2) {
                return {
                    cost: item1.cost + item2.cost,
                    expenses: item1.expenses + item2.expenses,
                    profit: item1.profit + item2.profit,
                    workWeek: item1.workWeek,
                };
            } else {
                return item1;
            }
        }
    });

    const choosenResultIssueData = resultIssueData.slice(-selectedValue);
    const nameCost = `${t("IssueChart.cost")}`;
    const nameExpenses = `${t("IssueChart.expenses")}`;
    const nameProfit = `${t("IssueChart.profit")}`;

    useEffect(() => { 
        const originalConsoleError = console.error;

        console.error = (...args: any[]) => {
            if (typeof args[0] === "string" && /defaultProps/.test(args[0])) {
                return;
            }

            originalConsoleError(...args);
        };

        return () => {
            console.error = originalConsoleError;
        };
    }, []);

    return (
        <>
            <section className={style.issue__bar_chart__container}>
                <h3>{t("IssueChart.header")}</h3>
                <div>
                    <div className={style.issue__bar_chart__options}>
                        <p>{t("IssueChart.chooseWeeks")}</p>
                        <select
                            className={style.selector}
                            value={selectedValue}
                            onChange={handleChange}
                        >
                            {values.map((value, index) => (
                                <option key={index} value={value}>
                                    {value}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className={style.issue__bar_chart}>
                        <ResponsiveContainer>
                            <BarChart
                                data={choosenResultIssueData}
                                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                                <CartesianGrid strokeDasharray="3 3" />
                                <XAxis dataKey="workWeek" />
                                <YAxis />
                                <Tooltip />
                                <Legend />
                                <Bar
                                    dataKey="cost"
                                    name={nameCost}
                                    stackId="a"
                                    fill="#8884d8"
                                />
                                <Bar
                                    dataKey="expenses"
                                    name={nameExpenses}
                                    stackId="a"
                                    fill="#ffc658"
                                />
                                <Bar
                                    dataKey="profit"
                                    name={nameProfit}
                                    stackId="a"
                                    fill="#82ca9d"
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>
            </section>
        </>
    );
}
