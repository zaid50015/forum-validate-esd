import * as yup from "yup";
// labLocationName: "",
//     labLocationIdentifier: "",
//     labLocationLeadName: "",
//     labLocationEmail: "",
//     labLocationContactNumber: "",
//     labLocationAddress: "",
//     labLocationDescription: ""
export const labTeamMemberSchema = yup.object().shape({
    labLocationContactNumber: yup.string().required('Contact number is required.').test(
        'is-valid-phone-number',
        'Invalid phone number.',
        value => isValidPhoneNumber(value)
    ),
    
    labLocationEmail: yup.string().email('Invalid email address.').required('Email is required.'),
    labLocationLeadName: yup.string()
  .matches(/^[A-Za-z\s]+$/, 'Only alphabets and spaces are allowed')
  .min(2, 'Too Short!')
  .max(30, 'Too Long!')
  .required('Required'),
});

function isValidPhoneNumber(phoneNumber) {
    const phoneRegex = /^[6-9]\d{9}$/;
    return phoneRegex.test(phoneNumber);
}