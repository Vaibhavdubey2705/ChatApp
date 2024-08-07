import { useContext } from "react";
import {Form, Alert, Button, Row, Col, Stack} from "react-bootstrap"
import { AuthContext } from "../components/context/AuthContext";

const Login = () => {
    const {logoutUser,
      loginUser,
      loginInfo,
      updateLoginInfo,
      loginError,
      isLoginLoading } = useContext(AuthContext);
    return(
        <>
         <Form onSubmit={loginUser}>
          <Row style={{
            height: "100vh",
            justifyContent: "center",
            padding: "10%",
          }}>
            <Col xs={6}>
             <Stack gap={3}>
                <h2>Login</h2>
                <Form.Control type="email" placeholder="email" onChange = {(e) => updateLoginInfo({...loginInfo, email: e.target.value})}/>
                <Form.Control type="password" placeholder="password" onChange = {(e) => updateLoginInfo({...loginInfo, password: e.target.value})}/>
                <Button variant="secondary" type="submit">
                    Login
                </Button>
                {loginError?.error && (
                 <Alert variant="danger">
                   <p>{loginError?.message}</p>
                 </Alert>
                )}
             </Stack>
            </Col>
          </Row>
         </Form>
        </>
    )
}
 
export default Login;