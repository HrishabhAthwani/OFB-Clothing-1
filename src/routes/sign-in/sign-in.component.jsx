import { 
    createUserDocumentWithAuth, 
    signInWithGooglePopup, 
     } from "../../utils/firebase/firebase.utils";
import { async } from "@firebase/util";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

const SignIn = ()=>{

    const logGoogleUser = async ()=>{
        const {user} = await signInWithGooglePopup();
        const userDocRef= await createUserDocumentWithAuth(user)
    } 

    return (
        <div>
            <h1>Sign In Page</h1>
            <button onClick={logGoogleUser}>Sign In</button>
            <SignUpForm/>
        </div>
    )
}

export default SignIn;