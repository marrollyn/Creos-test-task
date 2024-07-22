import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    getDesignersSelector,
    fetchDesigners,
    fetchNextDesigners,
    getNextPage,
} from "../../../slice/desinerSlice";
import { AppDispatch } from "../../../store/store";
import * as _ from "lodash";
import style from "./TopTenDesigners.module.css";
import { useTranslation } from "react-i18next";

export function TopTenDesigners() {
    const { t } = useTranslation();

    const designers = useSelector(getDesignersSelector);

    const dispatch = useDispatch<AppDispatch>();

    const designersResult = designers.results;

    const nextPage = useSelector(getNextPage);

    useEffect(() => {
        if (!designers.count) {
            dispatch(fetchDesigners());
        }
    }, []);

    useEffect(() => {
        if (nextPage) {
            dispatch(fetchNextDesigners(nextPage));
        }
    }, [nextPage]);

    const convertMillisecondsToDHM: (milliseconds: number) => {
        hours: number;
        minutes: number;
        seconds: number;
    } = (milliseconds) => {
        const hours = Math.floor(milliseconds / (60 * 60 * 1000));
        const minutes = (milliseconds - hours * (60 * 60 * 1000)) / (60 * 1000);
        const seconds =
            (milliseconds - hours * (60 * 60 * 1000) - minutes * (60 * 1000)) / 1000;
        return { hours, minutes, seconds };
    };

    const filteredDesignersData = designersResult
        .map(function (element) {
            const issueDone = element.issues.filter(
                (issue) => issue.status === "Done"
            );
            const issueDoneCount = issueDone.length;
            if (issueDoneCount > 0) {
                const executingTime = issueDone
                    .map(function (issueDoneElement) {
                        const startTime = new Date(
                            issueDoneElement.date_started_by_designer
                        );
                        const endTime = new Date(
                            issueDoneElement.date_finished_by_designer
                        );
                        return endTime.getTime() - startTime.getTime();
                    })
                    .sort((a, b) => a - b);

                const medianExecutingTime = (executingTime: number[]) => {
                    const length = executingTime.length;
                    if (length === 1) {
                        return executingTime[0];
                    } else if (length % 2 === 0) {
                        return (
                            (executingTime[length / 2 - 1] + executingTime[length / 2]) / 2
                        );
                    } else {
                        return executingTime[Math.floor(length / 2)];
                    }
                };

                return {
                    avatar: element.avatar,
                    username: element.username,
                    issueDoneCount: issueDoneCount,
                    medianExecutingTime: convertMillisecondsToDHM(
                        medianExecutingTime(executingTime)
                    ),
                    executingTime: executingTime,
                    issueDone: issueDone,
                };
            }
        })
        .filter(Boolean);

    const sortedDesignersData = _.orderBy(
        filteredDesignersData,
        ["issueDoneCount", "medianExecutingTime"],
        ["desc", "desc"]
    );

    const TopTenDesigners = sortedDesignersData.slice(0, 10);

    return (
        <section>
            <h2 className={style.rank_list__header}>{t("HomePage.top_designers")}</h2>
            <div className={style.rank_list__container}>
                {TopTenDesigners.map((designer) => (
                    <article className={style.rank_container} key={designer?.username}>
                        {designer && (
                            <div className={style.rank_list__subcontainer}>
                                <img
                                    className={style.avatar}
                                    src={designer.avatar}
                                    alt={`${t("Designers.avatar")}`}
                                />
                                <div>
                                    <p>
                                        {t("HomePage.name")}: {designer.username}
                                    </p>
                                    <p>
                                        {t("HomePage.count")}: {designer.issueDoneCount}
                                    </p>
                                    <p>
                                        {t("HomePage.median")}: {designer.medianExecutingTime.hours}{" "}
                                        {t("HomePage.hours")} {designer.medianExecutingTime.minutes}{" "}
                                        {t("HomePage.minutes")}
                                    </p>
                                </div>
                            </div>
                        )}
                    </article>
                ))}
            </div>
        </section>
    );
}
