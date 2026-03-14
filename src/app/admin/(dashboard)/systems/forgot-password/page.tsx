"use client"

import { useState } from "react"

export default function ForgotPassword(){
    const [email,setEmail] = useState("")

    const submit = async () => {

        await fetch("http://localhost:3000/api/v1/auth/forgot-password",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
            body:JSON.stringify({email})
        })

        alert("Check your email")
    }

    return (
        <div>
        <h1>Forgot password</h1>

        <input
            type="email"
            onChange={(e)=>setEmail(e.target.value)}
        />

        <button onClick={submit}>
            Send reset link
        </button>

        </div>
    )
}