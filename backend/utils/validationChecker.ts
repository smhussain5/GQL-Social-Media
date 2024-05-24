// FUNCTION 1
function loginValidationChecker(username: string, password: string) {
    const errors = {};
    // CHECK IF USERNAME IS EMPTY
    if (username.trim() === "") {
        errors["USERNAME"] = "Username cannot be empty!";
    };
    // CHECK IF PASSWORD IS EMPTY
    if (password.trim() === "") {
        errors["PASSWORD"] = "Password cannot be empty!";
    };
    return { errors, valid: Object.keys(errors).length === 0 };
};

// VALIDATE REGISTRATION INFORMATION
function registrationValidationChecker(username: string, password: string, confirmPassword: string, email: string) {
    // COLLECT ERRORS
    const errors = {};
    // CHECK IF USERNAME IS EMPTY
    if (username.trim() === "") {
        errors["USERNAME"] = "Username cannot be empty!";
    };
    // CHECK IF USERNAME IS CORRECT LENGTH
    if (username.trim().length < 5) {
        errors["USERNAME"] = "Username must be at least 5 characters!";
    };
    // CHECK IF USERNAME IS VALID
    if (username.trim().includes(' ')) {
        errors["USERNAME"] = "Please do not use ' ' or '.' in your username!";
    };
    // CHECK IF USERNAME IS VALID
    if (username.trim().includes('.')) {
        errors["USERNAME"] = "Please do not use ' ' or '.' in your username!";
    };
    // CHECK IF PASSWORD IS EMPTY
    if (password.trim() === "") {
        errors["PASSWORD"] = "Password cannot be empty!";
    };
    // CHECK IF EMAIL IS EMPTY
    if (email.trim() === "") {
        errors["EMAIL"] = "Email cannot be empty!";
    };
    // CHECK IF EMAIL IS VALID
    if (!email.trim().includes('@')) {
        errors["EMAIL"] = "Enter a valid email address!";
    };
    // CHECK IF PASSWORDS DO NOT MATCH
    if (password.trim() !== confirmPassword.trim()) {
        errors["PASSWORD"] = "Password do not match!";
    };
    // CHECK IF PASSWORD IS CORRECT LENGTH
    if (password.trim().length < 10) {
        errors["PASSWORD"] = "Password must be at least 10 characters!";
    };
    return { errors, valid: Object.keys(errors).length === 0 };
};

// FUNCTION 3
function postValidationChecker(body: string) {
    const errors = {};
    // CHECK IF BODY IS EMPTY
    if (body.trim() === "") {
        errors["BODY"] = "Body cannot be empty!";
    };
    // CHECK IF BODY IS TOO LONG
    if (body.trim().length > 150) {
        errors["BODY"] = "Body cannot be more than 150 character!";
    };
    return { errors, valid: Object.keys(errors).length === 0 };
};

export { loginValidationChecker, registrationValidationChecker, postValidationChecker };