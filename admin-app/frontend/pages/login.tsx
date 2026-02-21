import { useState } from 'react'
import axios from 'axios'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [otpRequired, setOtpRequired] = useState(false)
  const [otp, setOtp] = useState('')

  async function submit(e: any) {
    e.preventDefault()
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, { email, password })
      if (res.data?.otpRequired) setOtpRequired(true)
      // store tokens and continue (implement secure storage)
      console.log(res.data)
    } catch (err) {
      alert('Login failed')
    }
  }

  async function submitOtp(e: any) {
    e.preventDefault()
    try {
      const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/otp/verify`, { code: otp })
      console.log(res.data)
    } catch (err) {
      alert('OTP verify failed')
    }
  }

  return (
    <main style={{padding:40}}>
      <h1>Admin Login</h1>
      {!otpRequired ? (
        <form onSubmit={submit}>
          <div>
            <label>Email</label>
            <input value={email} onChange={(e)=>setEmail(e.target.value)} />
          </div>
          <div>
            <label>Password</label>
            <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} />
          </div>
          <button type="submit">Login</button>
        </form>
      ) : (
        <form onSubmit={submitOtp}>
          <div>
            <label>OTP</label>
            <input value={otp} onChange={(e)=>setOtp(e.target.value)} />
          </div>
          <button type="submit">Verify OTP</button>
        </form>
      )}
    </main>
  )
}
