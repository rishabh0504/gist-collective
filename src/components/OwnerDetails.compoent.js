import { useEffect, useState } from "react";
import { getGistForked } from './../api/gist-api';
import UserNotFound from "./UserNotFound";

const  OwnerDetails = (props)  => {
  const [userCommit, setUserCommits] = useState([]);

  useEffect(async () => {
    const forkedData = await getGistForked(props.id);
    forkedData.sort((a, b) => {
      return new Date(b.committed_at) - new Date(a.committed_at);
    });
    const lastCommits = forkedData.splice(0, 3);
    setUserCommits(lastCommits);
  }, [props.id])
  return (
    <div className='col-12'>
      <p className='text-success'><b>Last forked users</b></p>
      <ul className="list-group">
        {
          userCommit && (
            userCommit.map((commits, index) => {
              return (
                <li className="list-group-item custom-font avatar-li" key={index}>
                  <div className="center">
                    <img src={commits.owner.avatar_url} className='avatar ml-3 mr-3' />
                  </div>
                  <div className="center mt-2">
                    <b>{commits.owner.login}</b>
                  </div>
                </li>
              )
            })
          )
        }
      </ul>

      {
        !userCommit.length > 0 && (
         <UserNotFound/>
        )
      }
    </div>
  )
}
export default OwnerDetails;
