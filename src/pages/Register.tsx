import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Eye, EyeOff } from "lucide-react"

export default function Register(){

const navigate = useNavigate()

const [loading,setLoading] = useState(false)
const [showPassword,setShowPassword] = useState(false)
const [terms,setTerms] = useState(false)

const [form,setForm] = useState({
firstName:"",
lastName:"",
email:"",
phone:"",
password:"",
confirmPassword:"",
region:"",
district:"",
constituency:""
})

const handleChange=(key:string,value:string)=>{
setForm({...form,[key]:value})
}

const handleRegister=async()=>{

if(!form.firstName || !form.lastName || !form.email || !form.password){
alert("Please fill all required fields")
return
}

if(form.password !== form.confirmPassword){
alert("Passwords do not match")
return
}

if(!terms){
alert("Accept Terms and Privacy Policy")
return
}

setLoading(true)

try{

const API = import.meta.env.VITE_API_BASE_URL

const response = await fetch(`${API}/auth/register`,{
method:"POST",
headers:{
"Content-Type":"application/json"
},
body:JSON.stringify(form)
})

const text = await response.text()

let data

try{
data = JSON.parse(text)
}catch{
data = {message:text}
}

if(!response.ok){
throw new Error(data.message || "Registration failed")
}

alert("Account created successfully")

navigate("/login")

}catch(err:any){

alert(err.message || "Registration failed")

}

setLoading(false)

}

return(

<div className="min-h-screen flex items-center justify-center bg-gray-100">

<div className="w-full max-w-md bg-white p-8 rounded-lg shadow">

<div className="flex items-center gap-3 mb-6">

<img
src="/ncmp-logo.png"
alt="NCMP"
className="w-10 h-10"
/>

<h2 className="text-xl font-bold">
NCMP Uganda
</h2>

</div>

<h3 className="text-lg font-semibold mb-4">
Create Account
</h3>

<input
placeholder="First Name"
className="w-full border p-2 mb-3"
value={form.firstName}
onChange={(e)=>handleChange("firstName",e.target.value)}
/>

<input
placeholder="Last Name"
className="w-full border p-2 mb-3"
value={form.lastName}
onChange={(e)=>handleChange("lastName",e.target.value)}
/>

<input
placeholder="Email"
className="w-full border p-2 mb-3"
value={form.email}
onChange={(e)=>handleChange("email",e.target.value)}
/>

<input
placeholder="Phone"
className="w-full border p-2 mb-3"
value={form.phone}
onChange={(e)=>handleChange("phone",e.target.value)}
/>

<div className="relative">

<input
type={showPassword ? "text":"password"}
placeholder="Password"
className="w-full border p-2 mb-3"
value={form.password}
onChange={(e)=>handleChange("password",e.target.value)}
/>

<button
type="button"
onClick={()=>setShowPassword(!showPassword)}
className="absolute right-3 top-3"
>

{showPassword ? <Eye size={18}/> : <EyeOff size={18}/>}

</button>

</div>

<input
type="password"
placeholder="Confirm Password"
className="w-full border p-2 mb-3"
value={form.confirmPassword}
onChange={(e)=>handleChange("confirmPassword",e.target.value)}
/>

<label className="flex gap-2 text-sm mb-4">

<input
type="checkbox"
checked={terms}
onChange={(e)=>setTerms(e.target.checked)}
/>

I agree to Terms and Privacy Policy

</label>

<button
onClick={handleRegister}
disabled={loading}
className="w-full bg-black text-white p-2 rounded"
>

{loading ? "Creating..." : "Create Account"}

</button>

<div className="mt-4 text-sm text-center">

Already have account?

<Link
to="/login"
className="text-blue-600 ml-1"
>

Login

</Link>

</div>

</div>

</div>

)

}