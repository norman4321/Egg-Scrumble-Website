/* For login form */



var Remail = "ResetPasswordEmail";

async function LoginValidation() {
    // get the values
    let email = document.getElementById("exampleInputLoginID").value;
    let password = document.getElementById("exampleInputPassword").value;


    // clear error message
    document.getElementById("error").innerHTML = null;

    try {
        const res = await fetch('/login', {
            method: 'POST',
            body: JSON.stringify({ email, password }),
            headers: { 'Content-Type': 'application/json' }
        });
        const data = await res.json();
        console.log(data);
        if (data.errors) {
            if (data.errors.email)
                document.getElementById("error").innerHTML = `<span style='color: red;'> ${data.errors.email}</span>`;
            else if (data.errors.password)
                document.getElementById("error").innerHTML = `<span style='color: red;'> ${data.errors.password}</span>`;
            else
                document.getElementById("error").innerHTML = `<span style='color: red;'>incorrect email or password</span>`;
        }
        if (data.user) {
            location.assign('/');
        }
    } catch (err) {
        console.log(err);
    }


}

/* For sign-up form */
async function SignUpSubmit() {
    let first_name = document.getElementById("exampleInputFirstNameID").value;
    let last_name = document.getElementById("exampleInputLastNameID").value;
    let email = document.getElementById("exampleInputEmail").value;
    let password = document.getElementById("exampleInputPassword").value;
    let re_password = document.getElementById("exampleInputPasswordRe").value;
    let firstnameValid = true,
        lastnameValid = true,
        emailValid = true,
        passwordValid = true,
        repasswordValid = true;

    // clear error messages
    document.getElementById("FirstNameRequired").innerHTML = null;
    document.getElementById("LastNameRequired").innerHTML = null;
    document.getElementById("EmailRequired").innerHTML = null;
    document.getElementById("PasswordRequired").innerHTML = null;
    document.getElementById("RePasswordRequired").innerHTML = null;

    // Check for simple errors before fetch 
    if (first_name == "") {
        firstnameValid = false;
        document.getElementById("FirstNameRequired").innerHTML = "<span style='color: red;'>This field is required</span>";
    } else {
        firstnameValid = true;
        document.getElementById("FirstNameRequired").innerHTML = null;
    }
    if (last_name == "") {
        lastnameValid = false;
        document.getElementById("LastNameRequired").innerHTML = "<span style='color: red;'>This field is required</span>";
    } else {
        lastnameValid = true;
        document.getElementById("LastNameRequired").innerHTML = null;
    }
    if (email == "") {
        emailValid = false;
        document.getElementById("EmailRequired").innerHTML = "<span style='color: red;'>This field is required</span>";
    } else {
        emailValid = true;
        document.getElementById("EmailRequired").innerHTML = null;
    }
    if (password == "") {
        passwordValid = false;
        document.getElementById("PasswordRequired").innerHTML = "<span style='color: red;'>This field is required</span>";
    } else {
        passwordValid = true;
        document.getElementById("PasswordRequired").innerHTML = null;
    }
    if (re_password == "") {
        repasswordValid = false;
        document.getElementById("RePasswordRequired").innerHTML = "<span style='color: red;'>This field is required</span>";
    } else {
        repasswordValid = true;
        document.getElementById("RePasswordRequired").innerHTML = null;
    }
    if (re_password != password) {
        repasswordValid = false;
        document.getElementById("RePasswordRequired").innerHTML = "<span style='color: red;'>Password did not match</span>";
    } else {
        repasswordValid = true;
        document.getElementById("RePasswordRequired").innerHTML = null;
    }

    if (firstnameValid && lastnameValid && emailValid && passwordValid && repasswordValid) {
        try {
            const res = await fetch('/signup', {
                method: 'POST',
                body: JSON.stringify({ email, password, first_name, last_name }),
                headers: { 'Content-Type': 'application/json' }
            });


            const data = await res.json();
            console.log(data);

            // Set error messages
            if (data.errors) {
                if (first_name == "")
                    document.getElementById("FirstNameRequired").innerHTML = "<span style='color: red;'>This field is required</span>";
                if (last_name == "")
                    document.getElementById("LastNameRequired").innerHTML = "<span style='color: red;'>This field is required</span>";
                document.getElementById("EmailRequired").innerHTML = `<span style='color: red;'> ${data.errors.email} </span>`;
                document.getElementById("PasswordRequired").innerHTML = `<span style='color: red;'> ${data.errors.password} </span>`;
                if (re_password != password)
                    document.getElementById("RePasswordRequired").innerHTML = "<span style='color: red;'>Password did not match</span>";
            }

            if (data.user)
                location.assign('/');
        } catch (err) {
            console.log(err);
        }
    }
}

async function PasswordReset() {

    let email = document.getElementById("exampleInputLoginID").value;
    let emailValid = false;
    var Remail = email;

    document.getElementById("error").innerHTML = null;

    if (email == "") {
        document.getElementById("error").innerHTML = `<span style='color: red;'>Enter A Valid Email</span>`;
        emailValid = false;
    } else if (/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(email))
        emailValid = true;
    else
        document.getElementById("error").innerHTML = `<span style='color: red;'>Enter A Valid Email</span>`;

    if (emailValid)

        try {
        const res = await fetch('/forgotpass', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(res);
        if (res.status == 400)
            document.getElementById("error").innerHTML = `<span style='color: red;'>No such email exist</span>`;
        else {


            alert("Check Your Email for Code " + Remail);
            window.location.href = '/forgotpasscode';
            document.getElementById("EmailRecipient").innerHTML = `<span style='color: red;'>email here</span>`;
        }
    } catch (err) {
        console.log(err);
    }
}


async function ConfirmCode() {
    alert(Remail);

    const inputCode = document.getElementById("verificationCodeID").value;


    console.log("Email " + email)
    try {
        const res = await fetch('/forgotpasscode', {
            method: 'POST',
            body: JSON.stringify({ email }),
            headers: { 'Content-Type': 'application/json' }
        });
        console.log(res);
        if (res.status == 400)
            alert("Wrong Code");
        else {

            window.location.href = '/enterpassword';



        }
    } catch (err) {
        console.log(err);
    }
}

async function ConfirmResetPassword() {}
