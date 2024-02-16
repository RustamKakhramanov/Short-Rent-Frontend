

import Layout from '../../components/layouts'
import { useEffect, useState } from 'react';
import Router from 'next/router'
import { Box } from '@mui/material';



const Profile = () => {
  
 
  const [user, setItems] = useState([]);

useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user) {
   setItems(user);
  } else {
    Router.push('/');
  }
}, []);
  
  // Show the user. No loading state is required
  return (
    <Box>
      <h1>Your Profile</h1>
      
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </Box>
  )
}

export default Profile