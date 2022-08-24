import { useState } from "react";
import {
  createAuthUserWithEmailAndPasword,
  createUserDocumentWithAuth,
} from "../../utils/firebase/firebase.utils";
import BUTTON from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import './sign-up-form.style.scss'

const defaultFormFeilds = {
  displayName: "",
  email: "",
  password: "",
  confirmPassword: "",
};


const SignUpForm = () => {
  const [formFeilds, setFormFeilds] = useState(defaultFormFeilds);
  const { displayName, email, password, confirmPassword } = formFeilds;

  const handeSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      alert("Password don't match");
      return;
    }

    try {
      const { user } = await createAuthUserWithEmailAndPasword(email, password);
      await createUserDocumentWithAuth(user, { displayName });
      resetForm();
    } catch (error) {
      if (error.code === "auth/email-already-in-use")
        alert("Email already in use");
      console.log("User creation error", error);
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormFeilds({ ...formFeilds, [name]: value });
  };

  const resetForm = () => {
    setFormFeilds(defaultFormFeilds);
  };

  return (
    <div className="sign-up-container">
        <h2>DONT HAVE AN ACCOUNT ?</h2>
      <span>SignUp here</span>
      <form onSubmit={handeSubmit}>
        
        <FormInput
        label='Display Name'
          type="text"
          required
          onChange={handleChange}
          value={displayName}
          name="displayName"
        />
        
        <FormInput
        label='Email'
          type="email"
          required
          onChange={handleChange}
          value={email}
          name="email"
        />
        
        <FormInput
        label='Password'
          type="password"
          required
          onChange={handleChange}
          value={password}
          name="password"
        />
        
        <FormInput
        label='Confirm Password'
          type="password"
          required
          onChange={handleChange}
          value={confirmPassword}
          name="confirmPassword"
        />
        <BUTTON type="submit">Sign Up</BUTTON>
      </form>
    </div>
  );
};

export default SignUpForm;
