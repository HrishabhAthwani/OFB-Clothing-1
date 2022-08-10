import { useState } from "react";

const defaultFormFeilds = {
    displayName:'',
    email:'',
    password:'',
    confirmPassword:'',
}

const SignUpForm = ()=>{
    const[formFeilds, setFormFeilds] = useState(defaultFormFeilds);
    const { displayName, email, password, confirmPassword }= formFeilds;

    const handleChange =(event)=>{
        const { name,value } = event.target

        setFormFeilds({...formFeilds,[name]:value})
    }
    return(
        <div>
            <h1>SignUp here</h1>
            <form>
                <label>Name</label>
                <input type='text' required onChange={handleChange} value={displayName} name='displayName'/>
                <label>Email</label>
                <input type='email' required onChange={handleChange} value={email} name='email'/>
                <label>Password</label>
                <input type='password' required onChange={handleChange} value={password} name='password'/>
                <label>Confirm Password</label>
                <input type='password' required onChange={handleChange} value={confirmPassword} name='confirmPassword'/>
            </form>
        </div>
    )
}

export default SignUpForm;