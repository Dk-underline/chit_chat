import { Alert, Button, Snackbar } from '@mui/material';
import { green } from '@mui/material/colors';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom'
import { LOGIN } from '../redux/auth/ActionType';
import { currentUser, login } from '../redux/auth/Action';

const SignIn = () => {
    const [inputData, setInputData] = useState({ email: "", password: "" })
    const [openSnackbar , setOpenSnackbar] = useState(false); 
    const {auth} = useSelector(store => store);
    const token = localStorage.getItem("token");
    const dispatch = useDispatch();
    const nevigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Handle Submit");
        setOpenSnackbar(true);
        dispatch(login(inputData))
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setInputData((values) => ({ ...values, [name]: value }));
    }
    const handleSnackbarClose = ()=>{

    }
    useEffect(() => {
        if (token) dispatch(currentUser(token))
    }, [token])
    useEffect(() => {
        console.log(auth)
        if (auth?.reqUser?.full_name) nevigate("/")
    }, [auth.reqUser])
    return (
        <div className='bg-slate-300'>
            <div className='items-center justify-center flex h-screen'>
                <div className='w-[30%] bg-white shadow-md p-10 rounded-md'>
                       <h1 className='font-bold text-2xl text-center'>LOGIN</h1>
                    <form onSubmit={handleSubmit} className='space-y-5'>
                        <div>
                            <p className='mb-2 ml-2'>Email</p>
                            <input
                                placeholder=' Enter Your Email'
                                onChange={handleChange}
                                value={inputData.email}
                                type='text'
                                name='email'
                                className='py-2 outline outline-green-600 rounded-md w-full border'
                            />
                        </div>
                        <div>
                            <p className='mb-2 ml-2'>Password</p>
                            <input
                                placeholder=' Enter Your Password'
                                onChange={handleChange}
                                value={inputData.password}
                                type='password'
                                name='password'
                                className='py-2 outline outline-green-600 rounded-md w-full border'
                            />
                        </div>
                        <div>
                            <Button type='submit' sx={{bgcolor:green[600] , padding:"0.5rem 0rem"}} variant='contained' className='w-full bg-green-600'>submit</Button>
                        </div>
                    </form>
                    <div className='flex items-center mt-5'>
                    <p className='m-0'>Create new Account?</p>
                    <Button variant='text' onClick={()=>{nevigate("/signUp")}}>signup</Button>
                    </div>
                </div>
            </div>
            <Snackbar open={openSnackbar} autoHideDuration={3000} onClose={handleSnackbarClose}>
  <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
    Login Scessefully!
  </Alert>
</Snackbar>
        </div>
    )
}

export default SignIn
