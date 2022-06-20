import { useEffect, useState } from "react";

const FileDetails = (props) => {
    const [languages, setLanguages] = useState({});
    useEffect(() => {
        const foundLanguages = [];
        const foundFilesMapping = {};
        Object.keys(props.files).map((fileKey) => {
            if (foundLanguages.includes(props.files[fileKey].language)) {
                foundFilesMapping[props.files[fileKey].language].push(props.files[fileKey].filename)
            } else {
                foundLanguages.push(props.files[fileKey].language)
                foundFilesMapping[props.files[fileKey].language] = [props.files[fileKey].filename]
            }
        })
        setLanguages(foundFilesMapping);
    }, [props.files]);
    return (
        <div className='col-12'>
            <p className="text-success"> <b>Modified files</b></p>
            <div className="card">
                <div className="card-body d-flex">
                    <ul className="list-group list-group-flush">
                        {
                            languages && (
                                Object.keys(languages).map((keyItem, index) => {
                                    return (
                                        <li className="list-group-item custom-font" key={index}>
                                            <b className='language-name'>{keyItem} : </b>  {languages[keyItem].join(', ')}
                                        </li>
                                    )
                                })
                            )
                        }
                    </ul>
                </div>
            </div>
        </div>
    )
}
export default FileDetails;
