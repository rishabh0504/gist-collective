import { useEffect, useState } from 'react';
import { getGist } from './api/gist-api';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import FileDetails from './components/FileDetails.component';
import OwnerDetails from './components/OwnerDetails.compoent';
import Header from './components/Header.component';
import NotFound from './components/NotFound';

function App() {
  const [username, setUsername] = useState("");
  const [gists, setGists] = useState([]);

  const searchUserGist = async () => {
    if (!!username) {
      const gistsDetail = await getGist(username);
      setGists(gistsDetail);
    }
  }

  return (
    <div>

      {/* Header Part */}
      <Header />
      {/* Input container Part */}

      <div className="row wrapper-container mt-4 mb-4">
        <div className="col-3 mr-3">
          <input
            type="text"
            className="form-control"
            placeholder="Search By Username..."
            value={username}
            onChange={e => setUsername(e.target.value)} />

        </div>
        <div className="col-3 mr-3">
          <button type="button" onClick={searchUserGist} className="btn btn-primary custom-btn">Filter</button>
        </div>
      </div>

      {
        gists && (
          gists.map((eachGist, index) => {
            return (
              <div className="row wrapper-container main-container " key={index}>
                <div className="col-12 mt-3 mb-3">
                  <div className="card bg-color">
                    <div className="card-body d-flex">
                      <div className="col-4 mrl-20">
                        <OwnerDetails id={eachGist.id} />
                      </div>
                      <div className="col-8 mrl-20">
                        <FileDetails files={eachGist.files} id={eachGist.id} />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )
      }

      {
        !gists.length > 0 && (
         <NotFound/>
        )
      }
    </div>
  );
}

export default App;
