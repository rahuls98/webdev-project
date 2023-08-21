import { useState, useContext } from "react";
import { useNavigate } from "react-router";
import "./style.css";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import VerticalSpace from "../../components/VerticalSpace";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import IconButton from "@mui/material/IconButton";
import InputAdornment from "@mui/material/InputAdornment";
import { loginThunk } from "../../services/auth-thunks";
import { useDispatch } from "react-redux";
import { setPage } from "../../reducers/navigation-reducer";
import MessageModalContext from "../../services/message-modal-context";
import { useSelector } from "react-redux";

const FormSignin = (props) => {
    const { currentUser } = useSelector((state) => state.user);
    const [email, setEmail] = useState("");
    const [emailError, setEmailError] = useState(false);
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [passwordError, setPasswordError] = useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { setMessageModalContent, messageModalHandleOpen } =
        useContext(MessageModalContext);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    const handleSigninSubmit = async () => {
        setEmailError(false);
        setPasswordError(false);
        if (email === "") {
            setEmailError(true);
        }
        if (password === "") {
            setPasswordError(true);
        }
        if (email && password) {
            try {
                await dispatch(loginThunk({ email, password }));
                if (currentUser) {
                    dispatch(setPage(-2));
                    navigate("/profile");
                } else {
                    messageModalHandleOpen(true);
                    setMessageModalContent(
                        "Login failed, please try again! If you don't have an account, register first."
                    );
                }
            } catch (e) {
                messageModalHandleOpen(true);
                setMessageModalContent(e.message);
            }
        }
    };

    return (
        <div className="FormSignin_container">
            <h1>Welcome!</h1>
            <p>Please enter your details.</p>
            <VerticalSpace size={30} />
            <TextField
                id="outlined-basic"
                label="Email"
                variant="outlined"
                type="email"
                style={{ background: "white" }}
                fullWidth
                required
                error={emailError}
                helperText={emailError ? "Required!" : ""}
                value={email}
                onChange={(val) => setEmail(val.target.value)}
            />
            <VerticalSpace size={30} />
            <TextField
                id="outlined-basic"
                label="Password"
                variant="outlined"
                type={showPassword ? "text" : "password"}
                InputProps={{
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                                edge="end"
                            >
                                {showPassword ? (
                                    <VisibilityOff />
                                ) : (
                                    <Visibility />
                                )}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
                style={{ background: "white" }}
                fullWidth
                required
                error={passwordError}
                helperText={passwordError ? "Required!" : ""}
                value={password}
                onChange={(val) => setPassword(val.target.value)}
            />
            <VerticalSpace size={10} />
            <div className="FormSignin_forgotpassword_container">
                <span>Forgot password</span>
            </div>
            <VerticalSpace size={30} />
            <Button
                variant="contained"
                fullWidth
                onClick={() => handleSigninSubmit()}
            >
                Sign in
            </Button>
            <VerticalSpace size={20} />
            <div className="FormSignin_signup_container">
                <span>Don't have an account? </span>
                <span
                    className="FormSignin_signup_option"
                    onClick={() => navigate("/register")}
                >
                    Sign up
                </span>
            </div>
        </div>
    );
};

export default FormSignin;
