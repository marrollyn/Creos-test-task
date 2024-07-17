
import {IssuePie} from './issuePie/IssuePie'
import {issueChart} from './issueChart/issueChart'


export const IssueList = () => {


    return (
        <section>
            <IssuePie/>
            <issueChart/>
        </section>
    );
};
