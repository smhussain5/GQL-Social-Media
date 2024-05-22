// FUNCTION 1
function loginValidationChecker(username: string, password: string) {
    const errors = {};
    // 1. CHECK IF USERNAME IS EMPTY
    if (username.trim() === "") {
        errors["USERNAME"] = "Username cannot be empty!";
    };
    // 2. CHECK IF PASSWORD IS EMPTY
    if (password.trim() === "") {
        errors["PASSWORD"] = "Password cannot be empty!";
    };
    return { errors, valid: Object.keys(errors).length === 0 };
};

// VALIDATE REGISTRATION INFORMATION
function registrationValidationChecker(username: string, password: string, confirmPassword: string, email: string) {
    // 0. COLLECT ERRORS
    const errors = {};
    // 1. CHECK IF USERNAME IS EMPTY
    if (username.trim() === "") {
        errors["USERNAME"] = "Username cannot be empty!";
    };
    // 2. CHECK IF USERNAME IS CORRECT LENGTH
    if (username.trim().length < 5) {
        errors["USERNAME"] = "Username must be at least 5 characters!";
    };
    // 3. CHECK IF USERNAME IS VALID
    if (username.trim().includes(' ')) {
        errors["USERNAME"] = "Please do not use ' ' or '.' in your username!";
    };
    // 4. CHECK IF USERNAME IS VALID
    if (username.trim().includes('.')) {
        errors["USERNAME"] = "Please do not use ' ' or '.' in your username!";
    };
    // 5. CHECK IF PASSWORD IS EMPTY
    if (password.trim() === "") {
        errors["PASSWORD"] = "Password cannot be empty!";
    };
    // 6. CHECK IF EMAIL IS EMPTY
    if (email.trim() === "") {
        errors["EMAIL"] = "Email cannot be empty!";
    };
    // 7. CHECK IF EMAIL IS VALID
    if (!email.trim().includes('@')) {
        errors["EMAIL"] = "Enter a valid email address!";
    };
    // 8. CHECK IF PASSWORDS DO NOT MATCH
    if (password.trim() !== confirmPassword.trim()) {
        errors["PASSWORD"] = "Password do not match!";
    };
    // 9. CHECK IF PASSWORD IS CORRECT LENGTH
    if (password.trim().length < 10) {
        errors["PASSWORD"] = "Password must be at least 10 characters!";
    };
    return { errors, valid: Object.keys(errors).length === 0 };
};

// FUNCTION 3
function postValidationChecker() {
    console.log("postValidationChecker");
};

export { loginValidationChecker, registrationValidationChecker, postValidationChecker };