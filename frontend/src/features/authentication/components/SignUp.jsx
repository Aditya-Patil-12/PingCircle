//  React Imports ======
import {
    useState
} from 'react'
// =====================

// JSX Imports =========
// =====================

// Chakara Imports =====
import { 
    FormControl, FormLabel, VStack,
    Input,InputGroup,InputRightElement,Button } from '@chakra-ui/react'
// =====================

const SignUp = () => {
    const [formInput,setFormInput] = useState({
        name:"",
        email:'',
        password:'',
        phoneNo:'',
        confirmPassword:'',
        profilePic:'',
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
  return (
    <VStack spacing={"5px"}>
      <FormControl id="text" isRequired>
        <FormLabel htmlFor="nameInput">Name</FormLabel>
        <Input
          id="nameInput"
          type="text"
          placeholder="Enter Your Name"
          onChange={(e) => handleChange("name", e.target.value)}
        />
      </FormControl>
      <FormControl id="email" isRequired>
        <FormLabel htmlFor="emailInput">Email</FormLabel>
        <Input
        type='email'
          id="emailInput"
          placeholder="Enter Your Email"
          onChange={(e) => handleChange("email", e.target.value)}
        />
      </FormControl>
      <FormControl id="phoneNo" isRequired>
        <FormLabel htmlFor="phoneNoInput">Phone No</FormLabel>
        <Input
          id="phoneNoInput"
          type={"tel"}
          placeholder="Enter Your Phone No"
          onChange={(e) => handleChange("phoneNo", e.target.value)}
        />
      </FormControl>
      <FormControl id="password" isRequired>
        <FormLabel htmlFor="passwordInput">Password</FormLabel>
        <InputGroup>
          <Input
            id="passwordInput"
            type={"password"}
            placeholder="Enter Your Password"
            onChange={(e) => handleChange("password", e.target.value)}
          />
        </InputGroup>
      </FormControl>
      <FormControl id="confirmPassword" isRequired>
        <FormLabel htmlFor="confirmPasswordInput">Confirm Password</FormLabel>
        <Input
        type='password'
          id="confirmPasswordInput"
          placeholder="Enter Your Confirm Password"
          onChange={(e) => handleChange("confirmPassword", e.target.value)}
        />
      </FormControl>

      <FormControl id="profilePic" isRequired>
        <FormLabel htmlFor="profilePictureInput">Profile Picture</FormLabel>
        <Input
          type={"file"}
          accept={"image/*"}
          id="profilePictureInput"
          placeholder=""
          onChange={(e)=>{handleChange("profilePic",e.target.files[0])}}
          width={"50%"}
        />
      </FormControl>

      <Button colorScheme='blue'
        width={"20%"}
        margin={"10px 0px"}
        onClick={submitHandler}>
            Sign Up
      </Button>
    </VStack>
  );
}

export default SignUp
