import "./style.css";

const AuthenticationLayout = (props) => {
    return (
        <div className="Authenticationlayout_container">
            <div className="Authenticationlayout_logo_container">
                <h1>CS5610 Project</h1>
            </div>
            <div className="Authenticationlayout_form_container">
                <div className="Authenticationlayout_form">
                    {props.children}
                </div>
            </div>
        </div>
    );
};

export default AuthenticationLayout;
