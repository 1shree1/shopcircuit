import React, { useEffect } from 'react'
import { createAdmin } from './Axios'
export default function Createadmin() {
useEffect(()=>{
    createAdmin()
})
  return (
    <>
    </>
  )
}