import {ISignUpData, TSignUpErrors} from "@/interfaces/types";
import {ILoginErrors, IUserData} from "@/interfaces/types";

export function validateLoginForm(values: IUserData) {
    const errors: ILoginErrors = {};

    if (values.email && !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
        errors.email = "This email is not valid";
    } else if (values.password && values.password && !/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/.test(values.password)) {
        errors.password = "The password must be at least 6 characters long and alphanumeric.";
    }

    return errors;
}

export const validateSignupForm = (values: ISignUpData): TSignUpErrors => {
    const errors: TSignUpErrors = {};

    if (!values.email) {
        errors.email = "Email is required";
    } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(values.email)) {
        errors.email = "This email is not valid";
    }

    if (!values.password) {
        errors.password = "Password is required";
    } else if (!/^(?=.*[a-zA-Z])(?=.*\d)[a-zA-Z\d]+$/.test(values.password)) {
        errors.password = "The password must be at least 6 characters long and alphanumeric.";
    }

    if (!values.name || values.name.trim().split(" ").length < 2) {
        errors.name = "Full name (first and last) is required";
    } else if (
        values.name
        .trim()
        .split(" ")
        .some((part) => part.length < 3)
    ) {
        errors.name = "Each part of the name must be at least 3 characters long"; //Limite 
    }

    if (!values.address || values.address.trim() === "") {
        errors.address = "Address is required";
    }

    if (!values.phone || !/^\d{7,12}$/.test(values.phone)) {
        errors.phone = "Phone number must be between 7 and 12 digits long";
    }

    return errors;
};
