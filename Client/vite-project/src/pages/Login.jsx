import {Form, Alert, Button, Row, Col, Stack} from "react-bootstrap"

const Login = () => {
    return(
        <>
         <Form>
          <Row style={{
            height: "100vh",
            justifyContent: "center",
            padding: "10%",
          }}>
            <Col xs={6}>
             <Stack gap={3}>
                <h2>Login</h2>
                <Form.Control type="email" placeholder="email"/>
                <Form.Control type="password" placeholder="password"/>
                <Button variant="secondary" type="submit">
                    Login
                </Button>
                <Alert variant="danger">
                  <p>an error occured</p>
                </Alert>
             </Stack>
            </Col>
          </Row>
         </Form>
        </>
    )
}
 
export default Login;