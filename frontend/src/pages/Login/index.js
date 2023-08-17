import "./style.css";
import AuthenticationLayout from "../../layouts/AuthenticationLayout";
import FormSignin from "../../components/FormSignin";

const Login = () => {
    return (
        <div className="Login_container">
            <AuthenticationLayout>
                <FormSignin />
            </AuthenticationLayout>
        </div>
    );
};

export default Login;
