import { IssuePie } from "./issuePie/IssuePie";
import { IssueGraph } from "./IssueGraph/IssueGraph";

export function IssueList() {
    return (
        <section>
            <IssueGraph />
            <IssuePie />
        </section>
    );
}
