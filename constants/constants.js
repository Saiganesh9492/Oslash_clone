module.exports = function constants(model){

    //Constants Json :
    const constants = {
        
        //Request Succesful (Status Code: 200) :
        SUCCESSFUL: "request successful",

        //Post request (Status code: 201) :
        MODEL_CREATE: "request successful, " + model + " created succesfully",

        //Patch request (Status code: 200) :
        MODEL_UPDATED: "request successful, " + model + " updated succesfully",

        //delete request (Status code: 200) :
        MODEL_DELETE: "request successful, " + model + " deleted succesfully",

        //Not found (Status Code: 400) :
        MODEL_NOT_FOUND: model + " not found",

        //Mail exists (Status Code: 409) :
        EMAIL_EXIST: "email already exists",

        //User Created (Status Code: 201) :
        USER_CREATED: "user created",

        //Authorization Failed (Status Code: 401) :
        AUTHORIZATION_FAILED: "authorization failed, enter valid email or password",

        //Not Authorized to perform a request (Status Code: 401) :
        NOT_AUTHORIZED: "you are not authorized to perform this request",

        //Authorization Succesful (Status Code: 200) :
        AUTHORIZATION_SUCCESFUL: "authorization Succesful",

        //CSV data import (Status Code: 200) :
        CSV_DATA_IMPORT: "request successful, imported csv data to mongoDb",

        //email sent (Status Code: 200) :
        EMAIL_SENT: "email sent successfully",

        //email sent (Status Code: 400) :
        EMAIL_NOT_SENT: "cannot send email",

        //cannot verify email (Status Code: 400) :
        EMAIL_CANNOT_VERIFIED: "Cannot Verify Email Adress",

        //email verified (Status Code: 200) :
        EMAIL_VERIFIED: "request successful, Email Verified succesfully",

        //Password changed (Status Code: 200) :
        PASSWORD_CHANGED_SUCCESFULLY: "password changed successfully",

        //Password changed (Status Code: 400) :
        PASSWORD_NOT_MATCH: "password changed successfully"
    };

    return constants;
};