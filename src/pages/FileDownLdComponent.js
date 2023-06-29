import React  from "react";
import RestAPIHandler from "../utils/RestAPIHandler";

import { Redirect } from "react-router-dom";


 
class FileDownLdComponent extends React.Component {

    constructor(props) {
        super(props);
    }  

    state = {  
        isFNDwnload: false,
    };

    componentDidMount() {
        this.downLdFilePage();
    }

    async downLdFilePage() {
        var { match } = this.props;       
        var idx=match.params.idx;
        if(idx!=='1' && idx!=='2' ) { return ; }

        var apihandler = new RestAPIHandler();
        var response = await apihandler.downLdFileData(idx); 
        this.setState({ isFNDwnload: true });

            // Create a temporary download link
            const downloadUrl = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = downloadUrl;
            if(idx==='1')
            {
              link.setAttribute('download', 'sunxu_CL.docx'); // Specify the desired file name and extension
            }
            else if (idx==='2')
            {
              link.setAttribute('download', 'sunxu_resume.docx');  
            }
            else {
              link.setAttribute('download', 'resume_sample.txt');  
            }


            document.body.appendChild(link);
            link.click();
      
            // Clean up the temporary download link
            link.parentNode.removeChild(link);
    }

  render() {
    return <Redirect to="/home" />;
 /*   return (    
      <React.Fragment> 
        <div>
          <Link to="/" >Back to Home</Link>
        </div> 
      </React.Fragment>
    ); */
  }
}
export default FileDownLdComponent;