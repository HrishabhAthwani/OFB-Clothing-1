import { useState } from "react";
import {
  signInWithGooglePopup,
  createUserDocumentWithAuth,
  signInAuthUserWithEmailAndPassword,
} from "../../utils/firebase/firebase.utils";
import BUTTON from "../button/button.component";
import FormInput from "../form-input/form-input.component";
import "./sign-in-form.style.scss";

const defaultFormFeilds = {
  email: "",
  password: "",
};

const SignInForm = () => {
  const [formFeilds, setFormFeilds] = useState(defaultFormFeilds);
  const { email, password } = formFeilds;

  const signInWithGoogle = async () => {
    const { user } = await signInWithGooglePopup();
    await createUserDocumentWithAuth(user);
  };

  const handeSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await signInAuthUserWithEmailAndPassword(
        email,
        password
      );
      console.log(response);
      resetForm();
    } catch (error) {
      if (error.code === "auth/wrong-password") alert("Incorrect Password");
      else if (error.code === "auth/user-not-found") alert("User Not Found");
      else console.log(error);
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
      <h2>ALREADY HAVE AN ACCOUNT ?</h2>
      <span>SignIn here</span>
      <form onSubmit={handeSubmit}>
        <FormInput
          label="Email"
          type="email"
          required
          onChange={handleChange}
          value={email}
          name="email"
        />

        <FormInput
          label="Password"
          type="password"
          required
          onChange={handleChange}
          value={password}
          name="password"
        />
        <div className="buttons-container">
          <BUTTON type="submit">Sign In</BUTTON>
          <BUTTON type='button' buttonType="google" onClick={signInWithGoogle}>
            Google Sign In
          </BUTTON>
        </div>
      </form>
    </div>
  );
};

export default SignInForm;
