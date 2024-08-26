import React, {useEffect, useState} from 'react'
import { Navigate } from 'react-router-dom'
export default function protectedRoute(props) {  
  if (localStorage.getItem('userToken')== null ){
    return props.children
  }
  else{
    // user not login
 return <Navigate to={'/freshcart/home'} />
  }
}