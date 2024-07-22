
// интерфейс описания Designer
export type DesignerItem = {
    avatar: string;
    username: string;
    email?: string;
    thumbnails: {
        avatar: string;
        avatar_2x: string;
        avatar_webp: string;
        avatar_webp_2x: string;
    };
}

type IssueDesignerList = {
    id: number;
    key: string;
    date_created: string;
    date_started_by_designer: string;
    date_finished_by_designer: string;
    status: string;
};

export type DesignerListItem = {
    avatar: string;
    username: string;
    email?: string;
    thumbnails: {
        avatar: string;
        avatar_2x: string;
        avatar_webp: string;
        avatar_webp_2x: string;
    };
    issues: IssueDesignerList[];
}
// интерфейс описания Designer List
export type DesignerList = {
    count: number;
    next: string | null;
    previous: null | string;
    results: DesignerListItem[];

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

