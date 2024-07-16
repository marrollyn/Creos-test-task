import { useSelector, useDispatch } from 'react-redux';
import {getIssuesSelector, fetchIssue} from '../../../slice/issueSlice';
import {AppDispatch} from '../../../store/store'
import { useEffect } from 'react';

export const IssueList = () => {
    const dispatch = useDispatch<AppDispatch>();
    const issues = useSelector(getIssuesSelector);

    useEffect(() => {
        if (!issues.length) {
            dispatch(fetchIssue());
        }
    }, []);
    // console.log(issues);

    const issuesDone = issues.filter(element => element.status === 'Done');

    const issuesNew = issues.filter(element => element.status === 'New');

    const InProgress = issues.filter(element => element.status === 'In Progress');

    console.log(issuesDone);

    return (
        <section>
            <h2>{issues.length}</h2>
            {issues.map((issue) => (
                    <article key={issue.id}>
                        <h4>{issue.project}</h4>
                        <h5>Project № {issue.id}</h5>
                        <p>{issue.status}</p>
                    </article>
                ))
            }
        </section>
    )
}