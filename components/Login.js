const Login = () => {
    return ( 
        <div className='flex items-center justify-center'>
            <div className='block shadow-lg w-64 h-80 justify-center bg-gray-100 mt-20'>
                <h1 className='block text-lg text-center pt-8 font-semibold'>Please Log In</h1>
                <h3 className='block text-md text-left pt-5 ml-2'>Email</h3> 
                <input className='block ml-10 text-center mt-3'  type="text" placeholder="Email" ></input>
                <h3 className='block text-md text-left pt-5 ml-2'>Password</h3> 
                <input className='block ml-10 text-center mt-3' type="text" placeholder="Password" ></input>
                <h2 className='block text-center text-black hover:text-cyan-600 hover:-translate-y-1 mt-10'>Log In</h2>
             </div>
        </div>
    )
}
export default Login;