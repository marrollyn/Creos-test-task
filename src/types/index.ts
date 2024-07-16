
// интерфейс описания Designer
export type DesignerItem = {
	avatar: string;
    username: string;
    thumbnails: {
        avatar: string;
        avatar_2x: string;
        avatar_webp: string;
        avatar_webp_2x: string;
    };
}

// интерфейс описания Designer List
export type DesignerList = {
    count: number;
    next: string;
    previous: null | string;
    results: {
        avatar: string;
        username: string;
        thumbnails: {
            avatar: string;
            avatar_2x: string;
            avatar_webp: string;
            avatar_webp_2x: string;
        };
        issues: {
            key: string;
            date_created: string;
            status: string; //"Done" | "In Progress";
        }[];
    } [];
}

// интерфейс описания Comment List
export type CommentList = {
	id: number;
	issue: string;
	designer: DesignerItem;
	date_created: string;
    message: string;
}

export type IssueItem = {
	id: number;
    status: string;
    designer: string | null;
    project: string;
    date_created: string;
    summary: string;
    received_from_client: number;
    send_to_project_manager: number;
    send_to_account_manager: number;
    send_to_designer: number;
    date_updated: string;
    date_started_by_designer: string | null;
    date_finished_by_designer: string | null;
    date_finished: string | null;
}

// интерфейс описания Issue List
export type IssueList = {
	id: number;
	issue: string;
	designer: DesignerItem;
	date_created: string;
}

