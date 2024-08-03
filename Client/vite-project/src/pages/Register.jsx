import { useContext } from "react";
import {Form, Alert, Button, Row, Col, Stack} from "react-bootstrap"
import { AuthContext } from "../components/context/AuthContext";
const Register = () => {
    
    //auth context ki values of use krne ke liye unhe aise import krte hain component mein
    const {registerInfo, updateRegisterInfo, registerUser, registerError, isRegisterLoading} = useContext(AuthContext);
    //now we'll see how we can update our state using registerInfo and updateRegisterInfo : we will fire onChange event
    //in form control and pass the event object, we will use this event object to update our state
   //just an example of how to get the data  const {user} = useContext(AuthContext);
    return(
        <>
         <Form onSubmit={registerUser}>
          <Row style={{
            height: "100vh",
            justifyContent: "center",
            padding: "10%",
          }}>
            <Col xs={6}>
             <Stack gap={3}>
                <h2>Register</h2>

                {/* the onChange event handler is triggered whenever the value of the input field changes. When triggered, 
                it calls an arrow function that updates the registerInfo state object by creating a new object that copies the
                 existing state and updates the name property with the current value of the input field. 
                This approach ensures that state updates are performed in an immutable and predictable manner */}

                <Form.Control type="text" placeholder="Name" 
                onChange={ (e) => 
                updateRegisterInfo({...registerInfo, name: e.target.value })}
                />
                <Form.Control type="email" placeholder="email"
                onChange={ (e) => 
                updateRegisterInfo({...registerInfo, email: e.target.value })}
                />
                <Form.Control type="password" placeholder="password"
                onChange={ (e) => 
                updateRegisterInfo({...registerInfo, password: e.target.value })}
                />
                <Button variant="secondary" type="submit">
                    { isRegisterLoading ? "Creating your account" : "Register"}
                </Button>

                {/* //error display krwane ke liye  */}
                {registerError?.error && (
                 <Alert variant="danger">
                   <p>{registerError?.message}</p>
                 </Alert>
                )}
             </Stack>
            </Col>
          </Row>
         </Form>
        </>
    )
}
 
export default Register;