import React from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBIcon,
  MDBInput,
} from 'mdb-react-ui-kit';
import JwtAuthHandler from "../utils/JwtAuthHandler";
import { Redirect } from "react-router-dom";
import CConfig from "../utils/CConfig";

class LoginComponent extends React.Component {
  state = {
    username: "",
    password: "",
    btnDisabled: true,
    loginStatus: 0,   
  };
  
  saveInputs = (event) => {
    var key = event.target.name;
    this.setState({ [key]: event.target.value });
    if (this.state.username !== "" && this.state.password !== "") {
      this.setState({ btnDisabled: false });
    } else {
      this.setState({ btnDisabled: true });
    }
  };

  formSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    this.setState({ loginStatus: 1 });
    JwtAuthHandler.login(
      this.state.username,
      this.state.password,
      this.handleAjaxResponse
    );
  };

  handleAjaxResponse = (data) => {
    console.log(data);
    if (data.error) {
      this.setState({ loginStatus: 4 });
    } else {
      this.setState({ loginStatus: 3 });
      window.location = CConfig.homeUrl;
    }
  };

  getMessages = () => {
    if (this.state.loginStatus === 0) {
      return "";
    } else if (this.state.loginStatus === 1) {
      return (
        <div class="alert alert-info">
          <strong>Just a moment, Please wait...</strong>
        </div>
      );
    } else if (this.state.loginStatus === 3) {
      return (
        <div class="alert alert-success">
          <strong>Login being Successful!!</strong>
        </div>
      );
    } else if (this.state.loginStatus === 4) {
      return (
        <div class="alert alert-danger">
          <strong>The information you entered doesn't match our records. Please try again.</strong>
        </div>
      );
    }
  };


  render() {
    if (JwtAuthHandler.isLoggedIn()) {
      return <Redirect to={CConfig.homeUrl} />;
    }
    document.body.className = "login-page";

    return (
      <React.Fragment>
        <MDBContainer className="my-5">     
          <MDBCard>
            <MDBRow className='g-0'>
              <MDBCol md='6'>
                <MDBCardImage src={CConfig.myImgUrl} alt="login form" width="640px" height="960px"
                className='rounded-start w-100'/>
              </MDBCol>

              <MDBCol md='6'>
                <MDBCardBody className='d-flex flex-column'>
                  <div className='d-flex flex-row mt-2'>
                    <MDBIcon fas icon="fa-solid fa-shield-halved fa-3x me-3" style={{ color: '#ff6219' }}/>
                    <span className="h1 fw-bold mb-0">My Resume</span>        
                  </div>
                  <h5 className="fw-normal my-4 pb-3" style={{letterSpacing: '1px'}}>Sign into your guest account</h5>
                  <div className="col-xs-12">{this.getMessages()}</div>
                  <form id="sign_in" method="POST" onSubmit={this.formSubmit}>
                      <MDBInput wrapperClass='mb-4' label='User name' name="username"  id='username' type='text' size="lg" onChange={this.saveInputs}/>
                      <MDBInput wrapperClass='mb-4' label='Password'  name="password"  id='password' type='password' size="lg" onChange={this.saveInputs}/>
                      <MDBBtn className="mb-4 px-5" color='success' size='lg' disabled={this.state.btnDisabled}>Login</MDBBtn>                    
                  </form>
                 
                  <a className="small text-muted" href="#!">Using the provided guest account only!</a>
                  <p className="mb-5 pb-lg-2" style={{color: '#393f81'}}>Or don't have a guest account yet?  
                  <a href={CConfig.contactPgeUrl}  style={{color: '#393f81'}}> Contact here</a></p>

                  <div className='d-flex flex-row justify-content-start'>
                    <a href={CConfig.ToUPgeUrl}  className="small text-muted me-1">Terms of use.</a>
                    <a href={CConfig.PPolicyPgeUrl}  className="small text-muted">Privacy policy</a>
                  </div>
                </MDBCardBody>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBContainer>
      </React.Fragment>
    );
  }
}

export default LoginComponent;
 