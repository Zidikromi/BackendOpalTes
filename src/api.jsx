import axios from "axios";




const baseUrl = 'http://localhost:3000';

export const GetUser = async () => {
  try {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Check if the token is available
    if (!token) {
      console.error('Token not found. User is not authenticated.');
      return; 
    }

    // Include the token in the request headers
    const getUser = await axios.get(`${baseUrl}/api/user`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log('getUser:', getUser.data);
    return getUser.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Re-throw the error for the component to handle
  }
};


export const GetUserId = async (id) => {
  try {
    // Retrieve the token from local storage
    const token = localStorage.getItem('token');

    // Check if the token is available
    if (!token) {
      console.error('Token not found. User is not authenticated.');
      return; 
    }

    // Include the token in the request headers
    const getUserId = await axios.get(`${baseUrl}/api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log('getUser:', getUser.data);
    return getUserId.data;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; // Re-throw the error for the component to handle
  }
};

export const postRegister = async () => {
  const register = await axios.post(`${baseUrl}/api/user`)
  console.log({Register: register })
}

export const postLogin = async () => {
  try {
    const response = await axios.post(`${baseUrl}/api/user/auth`);
    const { token } = response.data;

    
    localStorage.set('token', token);

    
    const userResponse = await axios.get('/user', {
      headers: {
        Authorization: 'Bearer ' + token,  
      },
    });

  
    const userData = userResponse.data;
    // console.log('User Data:', userData);

    return token;
  } catch (error) {
    console.error('Error during login:', error);
    throw error;
  }
};


export const deleteData = async (id) => {
  try {
 
    const token = localStorage.getItem('token');


    if (!token) {
      console.error('Token not found. User is not authenticated.');
      return; 
    }


    const deleteData = await axios.delete(`${baseUrl}/api/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    // console.log('deleteData:', deleteData.data);
    return;
  } catch (error) {
    console.error('Error fetching user data:', error);
    throw error; 
  }
}

export const PutData = async (id, editData) => {
  try {
    const token = localStorage.getItem('token');

    if (!token) {
      console.error('Token not found. User is not authenticated.');
      return;
    }

    const response = await axios.put(
      `${baseUrl}/api/user/${id}`,
      editData, 
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
      
    );

    // console.log('Edit:', response.data);
    return response.data;
  } catch (error) {
    console.error('Error editing user data:', error);
    throw error;
  }
};

// export const postEdit = async (id, editData) => {
//   try {
//     const editResponse = await axios.put(`${baseUrl}/api/user/${id}`, editData);
//     const { token } = editResponse.data;

//     // Store the token in local storage
//     localStorage.getItem('token', token);

//     // Returning both token and user data
//     return editResponse.data;
//   } catch (error) {
//     // console.error('Error during edit:', error);
//     throw error;
//   }
// };

