import * as yup from "yup";

export const labTeamMemberSchema = yup.object().shape({
    labTeamMemberName: yup.string().min(2,"Name must contain atleast 2 characters").max(30,"Name must be within 30 characters").required("Please enter your name"),
    labLocationName: yup.string().required('Lab Location is required'), 
    labTeamMemberContactNumber: yup.string().required('Contact number is required.').test(
        'is-valid-phone-number',
        'Invalid phone number.',
        value => isValidPhoneNumber(value)
    ),
    //   labTeamMemberContactNumber: yup.number().required('Contact number is required.'),
    labTeamMemberEmail: yup.string().email('Invalid email address.').required('Email is required.'),
    labTeamMemberAddress: yup.string().required('Your address is required'), 
    isApprover: yup.boolean(), 
    role: yup.string().required('Role is required.'),
});

function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phoneNumber);
}