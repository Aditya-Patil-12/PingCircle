//  React Imports ======
import {
    useState
} from 'react'
import { useAuth0 } from '@auth0/auth0-react';
import {Link} from 'react-router-dom'
// =====================

// JSX Imports =========
// =====================

// Chakara Imports =====
import { 
    FormControl, FormLabel, VStack,
    Input,Button } from '@chakra-ui/react'
// =====================

const Login = () => {
    console.log(window.location.origin);
    
    const {loginWithRedirect,isAuthenticated}  = useAuth0();
    const [formInput,setFormInput] = useState({
        email:'',
        password:'',
        phoneNo:'',
    });
    const handleChange = (inputType,value) =>{
        setFormInput({ ...formInput, [inputType]: value }); 
    }
    const submitHandler = (e )=>{
        e.preventDefault();
        
        for(let input in formInput){
            console.log(input," ",formInput[input])
            if( !formInput[input] ) return ;
        }
        console.log(formInput);
    }
    const handleClick = (e)=>{
        loginWithRedirect();
        console.log(isAuthenticated);
    }
  return (
    <VStack spacing={"5px"}>
        <Link to="/chats">Redirect</Link>
        <Button onClick={handleClick}>
            Login using Google
        </Button>
      <FormControl id="email" isRequired>
        <FormLabel htmlFor="emailInput">Email</FormLabel>
        <Input
          type="email"
        //   id="emailInput"
          placeholder="Enter Your Email"
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </FormControl>
      <FormControl id="phoneNo" isRequired>
        <FormLabel htmlFor="phoneNoInput">Phone No</FormLabel>
        <Input
        //   id="phoneNoInput"
          type={"tel"}
          placeholder="Enter Your Phone No"
          onChange={(e) => handleChange("phoneNo", e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel htmlFor="passwordInput">Password</FormLabel>
        <Input
        //   id="passwordInput"
          type={"password"}
          placeholder="Enter Your Password"
          onChange={(e) => handleChange("password", e.target.value)}
        />
      </FormControl>

      <Button
        colorScheme="blue"
        width={"20%"}
        margin={"10px 0px"}
        onClick={submitHandler}
      >
        Login
      </Button>
    </VStack>
  );
}

export default Login
