import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react";
import { useState } from "react";
import { Link,useNavigate } from "react-router-dom";
import OAuth from "../components/OAuth";


export default function SignUp() {
  const navigate = useNavigate()
  const [formData,setformData] = useState({})
  const handleChange = (e)=>{
    setformData({...formData,[e.target.id]:e.target.value.trim()})
  }
  const [loading,setLoading] = useState(false)
  const [ errorMessage,seterrorMessage] = useState(null)
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(
      !formData.email || !formData.password || !formData.username
    ){
      return seterrorMessage("All fields are required.")
    }
    try {

      setLoading(true);
      
      seterrorMessage(null)
      const res = await fetch('/api/auth/signup',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
      })
      const data = await res.json();
      if(data.success ===false){
        return seterrorMessage(data.message)
      }
      setLoading(false)
      if(res.ok){
        navigate('/sign-in')
      }
    } catch (error) {
      seterrorMessage(error.message)
      setLoading(false)
    }
  }
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
            Tech Trends
            </span>
            - An Innovative Blog Platform 
          </Link>
          <p className='text-sm mt-5'>
            You can sign up with your email and password
            or with Google.
          </p>
        </div>
        

        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
            <div>
              <Label value='Username' />
              <TextInput type='text' placeholder='enter your username' id='username' onChange={handleChange} />
            </div>
            <div>
              <Label value='Email' />
              <TextInput type='email' placeholder='name@email.com' id='email'onChange={handleChange} />
            </div>
            <div>
              <Label value='Password' />
              <TextInput type='password' placeholder='enter your password' id='password'onChange={handleChange} />
            </div>
            <Button gradientDuoTone='purpleToPink' type='submit' disabled={loading}>
              {
                loading ?(
                  <>
                  <Spinner size='m' />
                  <span className="pl-3">Loading..............</span>
                  </>
                ): 'Sign Up'
              }
            </Button>
            <OAuth />
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Have an account?</span>
            <Link to='/sign-in' className='text-blue-500'>
              Sign In
            </Link>
          </div>
          {
            errorMessage &&(
              <Alert className="mt-5" color='failure' >
                {errorMessage}
              </Alert>
            )
          }
        </div>
      </div>
    </div>
  );
}
  