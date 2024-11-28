import axios, { AxiosError } from "axios";

// export const getAdmin = async() => {
//   let config = {
//     method: "get",
//     url: "http://localhost:8080/get",
//     withCredentials : true,
//     headers:{
//       'Cookie' : 'cookie=this%20is%20cookie%20ok'
//     }
//   };
//   return await axios.request(config).then((response)=>{
//     return (response.data[0])
//   })
// };
export const createAdmin = async() => {
  let config = {
    method: "post",
    url: "http://localhost:8080/create/admin",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    data: {
      email: "admin@gmail.com",
      password: "admin",
      role: "admin",
    },
  };
  return await axios.request(config).then((response) => {
    return response;
  });
}
export const login = async (data) => {
  let config = {
    method: "post",
    url: "http://localhost:8080/login",
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
    data: data,
  };
  return axios.request(config).then((response) => {
    return response;
  });
};

export const logout = async () => {
  let config = {
    method: "get",
    url: "http://localhost:8080/logout",
    withCredentials: true,
  };
  try {
    return await axios.request(config).then((response) => {
      return response;
    });
  } catch (error) {
    console.error(error);
  }
};

export const newseller = async(data)=>{
  const config = {
    method : "post",
    url: "http://localhost:8080/newseller",
    headers:{
      "Content-Type": "application/json"
    },
    data: JSON.stringify(data)
  }
  return await axios.request(config).then((response)=>{
    console.log(response)
    return (response)
  })
}

export const getSellerRequests = async()=>{
  let config = {
    method: "get",
    url : "http://localhost:8080/sellersrequest",
    withCredentials: true
  }
  return axios.request(config).then((response)=>{
    return (response)
  })
} 

export const delSellerRequest =  async(id)=>{
  let config = {
    method: "delete",
    url : `http://localhost:8080/delrequest/${id}`,
    withCredentials: true
  }
  return await axios.request(config).then((response)=>{
    return response
  })
}
export const approveSeller = async(request, id)=>{
  let config = {
    method : "post",
    url : `http://localhost:8080/approveseller/${id}`,
    headers:{
      "Content-Type" : "application/json"
    },
    withCredentials : true,
    data : request
  }
  return await axios.request(config).then((response)=>{
    return response
  })
}

export const getSellers = async()=>{
  let config = {
    method : "get",
    url : "http://localhost:8080/sellers",
    withCredentials: true
  }
  return await axios.request(config).then((response)=>{
    return (response.data)
  })
}

export const delSeller = async(id)=>{
  let config={
    method:"delete",
    url:`http://localhost:8080/delseller/${id}`,
    withCredentials: true
  }
  return await axios.request(config).then((response)=>{
    return response
  })
}

export const addItem = async (formdata)=>{
  let config = { 
    method : "post",
    url:"http://localhost:8080/uploaditem",
    headers:{
      "Content-Type" :"multipart/form-data"
    },
    withCredentials: true,
    data: formdata
  }
  return await axios.request(config).then((response)=>{
    return (response)
  })
}
export const getProducts = async()=>{
  let config = {
    method:"get",
    url:"http://localhost:8080/yourproducts",
    withCredentials: true
  }
  return await axios.request(config).then((response)=>{
    return (response.data)
  })
}
export const viewListeditem = async()=>{
  let config={
    method:"get",
    url:"http://localhost:8080/listeditems",
    withCredentials: true
  }
  return await axios.request(config).then((response)=>{
    return response.data
  })
}
export const viewProduct = async(id)=>{
  let config = {
    method: "get",
    url : `http://localhost:8080/viewproduct/${id}`,
    withCredentials: true
  }
  return await axios.request(config).then((response)=>{
    return response.data
  })
}
export const seeListedItems = async (id)=>{
  let config={
    method:"get",
    url : `http://localhost:8080/seeListedItems/${id}`,
    withCredentials: true
  }
  return await axios.request(config).then((response)=>{
    return response.data
  })
}
export const deleteitem = async (id) =>{
  let config = {
    method : "delete",
    url : `http://localhost:8080/deleteitem/${id}`,
    withCredentials: true
  }
  return await axios.request(config).then((response)=>{
    return response
  })
}
export const newOrder = async(formdata) =>{
  let config = {
    method: "post",
    url: "http://localhost:8080/neworder",
    headers:{
      "Content-Type": "application/json"
    },
    withCredentials: true,
    data: formdata
  }
  return await axios.request(config).then((response)=>{
    return response
  })
}
export const getOrders = async()=>{
  let config= {
    method:"get",
    url:"http://localhost:8080/getorders",
    withCredentials: true
  }
  return await axios.request(config).then((response)=>{
    return response.data
  })
}
export const ordercompletion = async(id)=>{
  let config={
    method:"delete",
    url:`http://localhost:8080/ordercompleted/${id}`,
    withCredentials: true
  }
  return await axios.request(config).then((response)=>{
    return response
  })
}
export const getProduct = async(id)=>{
  let config={
    method:"get",
    url: `http://localhost:8080/updateyourproduct/${id}`,
    withCredentials: true
  }
  return await axios.request(config).then((response)=>{
    return response.data
  })
}
export const updateyourproduct = async(id, formData) =>{
  let config = {
    method:"put",
    url:`http://localhost:8080/update/${id}`,
    withCredentials: true,
    headers:{
      "Content-Type": "application/json"
    },
    data: formData
  }
  return await axios.request(config).then((response)=>{
    return response
  })
}
export const addRequirement = async (formData)=>{
  let config={
    method:"post",
    url:"http://localhost:8080/addrequirement",
    headers:{
      "Content-Type" : "multipart/form-data"
    },
    withCredentials: true,
    data: formData
  }
  return await axios.request(config).then((response)=>{
    return response
  })
}
export const getOrderRequests = async()=>{
  let config ={
    method:"get",
    url:"http://localhost:8080/orderrequests",
    withCredentials: true,
  }
  return await axios.request(config).then((response)=>{
    return response.data
  })
}
export const requestitem= async(id)=>{
  let config={
    method:"get",
    url:`http://localhost:8080/requestitem/${id}`,
    withCredentials:true
  }
  return await axios.request(config).then((response)=>{
    return response.data
  })
}
export const orderTaken = async(id)=>{
  let config={
    method:"post",
    url:`http://localhost:8080/takenorder/${id}`,
    headers:{
      "Content-Type": "application/json"
    },
    withCredentials:true
  }
  return await axios.request(config).then((response)=>{
    return response
  })
}
export const acceptedOrders = async()=>{
  let config ={
    method:"get",
    url:"http://localhost:8080/acceptedorders",
    withCredentials: true
  }
  return await axios.request(config).then((response)=>{
    return response.data
  })
}
export const requestAccomplished = async(id)=>{
  let config = {
    method:"delete",
    url: `http://localhost:8080/completerequest/${id}`,
    withCrede: true
  }
  return await axios.request(config).then((response)=>{
    return response
  })
}
export const searchedItem = async(search)=>{
  let config={
    method: "get",
    url:`http://localhost:8080/searcheditem?search=${search}`,
    withCredentials: true
  }
  return await axios.request(config).then((response)=>{
    return response.data
  })
}
export const postlists = async()=>{
  let config ={
    method:"get",
    url:"http://localhost:8080/postlists",
    withCredentials:true
  }
  return await axios.request(config).then((response)=>{
    return response.data
  })
}
export const delpost = async(id)=>{
  let config = {
    method:"delete",
    url: `http://localhost:8080/delpost/${id}`,
    withCredentials: true
  }
  return axios.request(config).then((response)=>{
    return response
  })
}