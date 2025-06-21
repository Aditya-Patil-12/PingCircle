import React from 'react'

// JSX Imports =========
// 1)auth imports 
import {Login,SignUp} from '../features/authentication/components';
// =====================


// Chakara Imports 
import {
  Container,
  Box,
  Text,
  Tabs,
  Tab,
  TabList,
  TabPanel,
  TabPanels} from "@chakra-ui/react";

const HomePage = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box
        d="flex"
        justifyContent="center"
        p={3}
        w="100%"
        m="40px 0 15px 0"
        bg="white"
        borderWidth={"1px"}
        borderRadius={"lg"}
      >
        <Text justifySelf={"center"}>Ping Circle</Text>
      </Box>

      <Box
      bg="white"
      w="100%"
      p={4}
      borderRadius={"lg"}
      borderWidth={"1px"}
      >
        <Tabs isFitted variant="soft-rounded">
          <TabList mb="1em">
            <Tab>Login</Tab>
            <Tab>SignUp</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login/>
            </TabPanel>
            <TabPanel>
              <SignUp />
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Container>
  );
}

export default HomePage
