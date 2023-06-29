import React,{ useRef } from "react";
import RestAPIHandler from "../utils/RestAPIHandler";
import DOMPurify from 'dompurify';
import { MDBCol, MDBContainer, MDBRow, MDBScrollspy, MDBScrollspyLink, MDBScrollspySubList,  MDBCarousel,
  MDBCarouselItem } from 'mdb-react-ui-kit';
 

class HomeComponent extends React.Component {
  
  constructor(props) {
    super(props);

  }  

  state = {  
  //  ImgRecList: [],
    dataLoaded: false,
    resumeHtmlData: " ",
  };

  componentDidMount() {
    this.fetchHomePage();
  }

  async fetchHomePage() {
    var apihandler = new RestAPIHandler();
    
//    var ImgRecDataList = await apihandler.fetchHomePage();
//    console.log(ImgRecDataList);
//    this.setState({ ImgRecList: ImgRecDataList.data  });

    var resumePGData = await apihandler.fetchResumePage(); 
    this.setState({ resumeHtmlData: resumePGData.data  });  
//    console.log(resumePGData);
    this.setState({ dataLoaded: true });
  }
  render() {
    return (    
      <React.Fragment> 
        <div dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(this.state.resumeHtmlData) }} /> 
      </React.Fragment>
    );
  }
}
export default HomeComponent;