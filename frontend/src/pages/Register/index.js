import "./style.css";
import AuthenticationLayout from "../../layouts/AuthenticationLayout";
import FormSignup from "../../components/FormSignup";

const Register = () => {
    return (
        <div className="Register_container">
            <AuthenticationLayout>
                <FormSignup />
            </AuthenticationLayout>
        </div>
    );
};

export default Register;
