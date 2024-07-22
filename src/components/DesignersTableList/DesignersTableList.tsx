import { useSelector, useDispatch } from "react-redux";
import {
    getDesignersSelector,
    fetchDesigners,
    fetchNextDesigners,
    getNextPage,
} from "../../slice/desinerSlice";
import { AppDispatch } from "../../store/store";
import { useEffect, useState } from "react";
import * as React from "react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import {
    ColumnDef,
    ColumnFiltersState,
    RowData,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table";
import { Filter } from "./tableFilterUtils";
import style from "./DesignersTableList.module.css";
import { useTranslation } from "react-i18next";

declare module "@tanstack/react-table" {
    //allows us to define custom properties for our columns
    interface ColumnMeta<TData extends RowData, TValue> {
        filterVariant?: "text" | "range" | "select";
    }
}

export function DesignersList() {
    const { t, i18n } = useTranslation();
    const dispatch = useDispatch<AppDispatch>();
    const [isLoading, setIsLoading] = useState(true);
    const nextPage = useSelector(getNextPage);

    useEffect(() => {
        if (!designers.count) {
            dispatch(fetchDesigners());
        }
    }, []);

    const designers = useSelector(getDesignersSelector);

    useEffect(() => {
        if (nextPage) {
            setIsLoading(true);
            dispatch(fetchNextDesigners(nextPage));
        } else setIsLoading(false);
    }, [nextPage]);

    useEffect(() => {
        _setData(() => [...designersGridColums]);
    }, [nextPage]);

    type TIssuesTable = {
        key: string;
        status: string;
    };

    type TDesignersTable = {
        avatar: string;
        username: string;
        email: string | undefined;
        issues: TIssuesTable[];
        issuesDone: number;
        issuesInProgress: number;
    };

    const designersResult = designers.results;

    const designersGridColums: TDesignersTable[] = designersResult.map(function (
        element
    ) {
        const issueDone = element.issues.filter((issue) => issue.status === "Done");
        const issuesInProgress = element.issues.filter(
            (issue) => issue.status === "In Progress"
        );
        const issueData = element.issues.map((issue) => ({
            key: issue.key,
            status: issue.status,
        }));
        return {
            avatar: element.avatar,
            username: element.username,
            email: element.email,
            issues: issueData,
            issuesDone: issueDone.length,
            issuesInProgress: issuesInProgress.length,
        };
    });

    const columns = React.useMemo<ColumnDef<TDesignersTable, any>[]>(
        () => [
            {
                accessorKey: "avatar",
                id: "avatar",
                header: () => <p>{t("Designers.avatar")}</p>,
                cell: (info) => (
                    <img
                        className={style.avatar}
                        src={info.getValue()}
                        alt={`{t("Designers.avatar")}`}
                    ></img>
                ),
                enableColumnFilter: false,
                enableSorting: false,
            },
            {
                accessorKey: "username",
                id: "username",
                header: () => <p>{t("Designers.username")}</p>,
                cell: (info) => <p>{info.getValue()}</p>,
                enableColumnFilter: true,
            },
            {
                accessorKey: "email",
                id: "email",
                header: () => <p>{t("Designers.email")}</p>,
                cell: (info) => info.getValue(),
                filterFn: "includesString",
            },
            {
                accessorKey: "issuesDone",
                id: "issuesDone",
                header: () => <p>{t("Designers.done")}</p>,
                cell: (info) => info.getValue(),
                enableColumnFilter: false,
            },
            {
                accessorKey: "issuesInProgress",
                id: "issuesInProgress",
                header: () => <p>{t("Designers.in_progress")}</p>,
                cell: (info) => info.getValue(),
                enableColumnFilter: false,
            },
            {
                accessorKey: "issues",
                id: "issues",
                header: () => <p>{t("Designers.issues")}</p>,
                cell: (info) => {
                    const value = info.getValue();
                    const valueArr: TIssuesTable[] = value.map((item: TIssuesTable) => {
                        return item.key;
                    });
                    const resultString = valueArr.join(", ").toString();
                    return resultString;
                },
                enableColumnFilter: false,
            },
        ],
        []
    );

    const [data, _setData] = React.useState(() => [...designersGridColums]);

    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
        []
    );

    const table = useReactTable({
        data,
        columns,
        filterFns: {},
        state: {
            columnFilters,
        },
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getFilteredRowModel: getFilteredRowModel(), //client side filtering
        getSortedRowModel: getSortedRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        debugTable: true,
        debugHeaders: true,
        debugColumns: false,
    });

    return (
        <section>
            {isLoading ? (
                <h2 className={style.header}>Загрузка...</h2>
            ) : (
                <div>
                    <h3 className={style.header}>{t("Designers.header")}</h3>
                    <div className="p-2">
                        <div className="h-2" />
                        <table className={style.table}>
                            <thead>
                                {table.getHeaderGroups().map((headerGroup) => (
                                    <tr key={headerGroup.id}>
                                        {headerGroup.headers.map((header) => {
                                            return (
                                                <th key={header.id} colSpan={header.colSpan}>
                                                    {header.isPlaceholder ? null : (
                                                        <>
                                                            <div
                                                                {...{
                                                                    className: header.column.getCanSort()
                                                                        ? "cursor-pointer select-none"
                                                                        : "",
                                                                    onClick:
                                                                        header.column.getToggleSortingHandler(),
                                                                }}
                                                            >
                                                                {flexRender(
                                                                    header.column.columnDef.header,
                                                                    header.getContext()
                                                                )}
                                                                {{
                                                                    asc: " 🔼",
                                                                    desc: " 🔽",
                                                                }[header.column.getIsSorted() as string] ??
                                                                    null}
                                                            </div>
                                                            {header.column.getCanFilter() ? (
                                                                <div>
                                                                    <Filter column={header.column} />
                                                                </div>
                                                            ) : null}
                                                        </>
                                                    )}
                                                </th>
                                            );
                                        })}
                                    </tr>
                                ))}
                            </thead>
                            <tbody>
                                {table.getRowModel().rows.map((row) => {
                                    return (
                                        <tr key={row.id}>
                                            {row.getVisibleCells().map((cell) => {
                                                return (
                                                    <td key={cell.id}>
                                                        {flexRender(
                                                            cell.column.columnDef.cell,
                                                            cell.getContext()
                                                        )}
                                                    </td>
                                                );
                                            })}
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                        <div className="h-2" />
                        <div className={style.pagination}>
                            <button
                                className="border rounded p-1"
                                onClick={() => table.setPageIndex(0)}
                                disabled={!table.getCanPreviousPage()}
                            >
                                {"<<"}
                            </button>
                            <button
                                className="border rounded p-1"
                                onClick={() => table.previousPage()}
                                disabled={!table.getCanPreviousPage()}
                            >
                                {"<"}
                            </button>
                            <button
                                className="border rounded p-1"
                                onClick={() => table.nextPage()}
                                disabled={!table.getCanNextPage()}
                            >
                                {">"}
                            </button>
                            <button
                                className="border rounded p-1"
                                onClick={() => table.setPageIndex(table.getPageCount() - 1)}
                                disabled={!table.getCanNextPage()}
                            >
                                {">>"}
                            </button>
                            <span className="flex items-center gap-1">
                                <div>{t("Designers.page")}</div>
                                <strong>
                                    {table.getState().pagination.pageIndex + 1}{" "}
                                    {t("Designers.of")} {table.getPageCount()}
                                </strong>
                            </span>
                            <span className="flex items-center gap-1">
                                {t("Designers.go_to_page")}
                                <input
                                    type="number"
                                    defaultValue={table.getState().pagination.pageIndex + 1}
                                    onChange={(e) => {
                                        const page = e.target.value
                                            ? Number(e.target.value) - 1
                                            : 0;
                                        table.setPageIndex(page);
                                    }}
                                    className="border p-1 rounded w-16"
                                />
                            </span>
                            <select
                                className={style.selector}
                                value={table.getState().pagination.pageSize}
                                onChange={(e) => {
                                    table.setPageSize(Number(e.target.value));
                                }}
                            >
                                {[16, 32, 64, 128, 256].map((pageSize) => (
                                    <option key={pageSize} value={pageSize}>
                                        {t("Designers.show")} {pageSize}
                                    </option>
                                ))}
                            </select>
                            <div>
                                {table.getPrePaginationRowModel().rows.length}{" "}
                                {t("Designers.rows")}{" "}
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
