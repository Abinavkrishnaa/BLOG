import { Alert, Button, Label, Spinner, TextInput } from "flowbite-react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import {useDispatch, useSelector} from 'react-redux';
import { signInStart,signInSuccess,signInFailure } from "../../redux/user/userSlice"

export default function SignIn() {
  
  const navigate = useNavigate()
  const [formData,setformData] = useState({})
  const handleChange = (e)=>{
    setformData({...formData,[e.target.id]:e.target.value.trim()})
  }
  const dispatch=useDispatch();
  const {loading,error:errorMessage} = useSelector(state=>state.user);
  const handleSubmit = async(e)=>{
    e.preventDefault();
    if(
      !formData.email || !formData.password 
    ){
      return dispatch(signInFailure("All fields are required."))
    }
    try {

      dispatch(signInStart());
      const res = await fetch('/api/auth/signin',{
        method:'POST',
        headers:{'Content-Type':'application/json'},
        body:JSON.stringify(formData)
      })
      const data = await res.json();
      if(data.success ===false){
        dispatch(signInFailure(data.message))
      }
      if(res.ok){
        dispatch(signInSuccess(data))
        navigate('/')
      }
    } catch (error) {
      dispatch(signInFailure(error.message));
    }
  }
  return (
    <div className='min-h-screen mt-20'>
      <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
        
        <div className='flex-1'>
          <Link to='/' className='font-bold dark:text-white text-4xl'>
            <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
             Abinav&apos;s
            </span>
            Blog
          </Link>
          <p className='text-sm mt-5'>
            You can sign in with your email and password
            or with Google.
          </p>
        </div>
        

        <div className='flex-1'>
          <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
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
                ): 'Sign In'
              }
            </Button>
          </form>
          <div className="flex gap-2 text-sm mt-5">
            <span>Don&apos;t Have an account?</span>
            <Link to='/sign-up' className='text-blue-500'>
              Sign Up
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
