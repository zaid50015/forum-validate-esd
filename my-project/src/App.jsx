import { useFormik } from "formik";
import React, { useState } from "react";
import { labTeamMemberSchema } from "./assets/schema/labTeamMemberSchema";
import {
  useParams,
} from "react-router-dom";
const App = () => {
  // const [initialValues, setinitialValues] = useState(null)
  const params=useParams();
  
  const initialValues = {
    labTeamMemberName: "Mo",
    labLocationName: "",
    labTeamMemberContactNumber: "",
    labTeamMemberEmail: "",
    labTeamMemberAddress: "",
    isApprover: true,
    role: "",
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues: initialValues,
      validationSchema: labTeamMemberSchema,
      validateOnChange: true,
      validateOnBlur: false,
      //// By disabling validation onChange and onBlur formik will validate on submit.
      onSubmit: (values, action) => {
        console.log("🚀 ~ file: App.jsx ~ line 17 ~ App ~ values", values);
        //// to get rid of all the values after submitting the form
        action.resetForm();
      },
    });
  console.log(errors);
  return (
    <div className="bg-slate-200 px-10 py-4">
      <div className=" text-gray-600 font-bold">
        Lab Team Member{" "}
        <span className="text-sm text-gray-400">
          (<span style={{ fontSize: "0.8em" }}>EDIT</span>)
        </span>
      </div>
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col text-gray-500  items-start h-50 bg-white border-t-2 border-blue-600 p-4 rounded-md">
          <h1 className="text-left mb-4">Manage Lab Team Member Details</h1>

          {/* Input field with label */}
          <div className="flex flex-col mt-2 w-full">
            <label
              className="text-gray-600 font-bold mb-1"
              htmlFor="labTeamMemberName"
            >
              Team Member Name<span className="text-red-500">*</span>:
            </label>
            <input
              type="text"
              className="border border-gray-300 p-2 "
              placeholder="Enter your name"
              name="labTeamMemberName"
              value={values.labTeamMemberName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.labTeamMemberName && touched.labTeamMemberName ? (
              <p className="text-red-500">{errors.labTeamMemberName}</p>
            ) : null}
          </div>
          <div className="flex flex-col mt-2 w-full">
            <label
              className="text-gray-600 font-bold mb-1"
              htmlFor="labLocationName"
            >
              Lab Location<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className="border border-gray-300 p-2 "
              placeholder="Enter the lablocation id"
              name="labLocationName"
              value={values.labLocationName}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.labLocationName && touched.labLocationName ? (
              <p className="text-red-500">{errors.labLocationName}</p>
            ) : null}
          </div>
          <div className="flex flex-col mt-2 w-full">
            <label
              className="text-gray-600 font-bold mb-1"
              htmlFor="labTeamMemberContactNumber"
            >
              Contact Number<span className="text-red-500">*</span>
            </label>
            <input
              type="number"
              className=" border border-gray-300 p-2 "
              placeholder="Enter your contack number"
              name="labTeamMemberContactNumber"
              value={values.labTeamMemberContactNumber}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.labTeamMemberContactNumber &&
            touched.labTeamMemberContactNumber ? (
              <p className="text-red-500">
                {errors.labTeamMemberContactNumber}
              </p>
            ) : null}
          </div>
          <div className="flex flex-col mt-2 w-full">
            <label className="text-gray-600 font-bold mb-1" htmlFor="role">
              Role<span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              className=" border border-gray-300 p-2 "
              placeholder="Enter your role"
              name="role"
              value={values.role}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.role && touched.role ? (
              <p className="text-red-500">{errors.role}</p>
            ) : null}
          </div>
          <div className="flex flex-row items-center mt-2 w-full">
            <label className="text-gray-600 font-bold" htmlFor="isApprover">
              Approver:
            </label>
            <input
              type="checkbox"
              className="mt-2 ml-1 border border-gray-300"
              name="isApprover"
              checked={values.isApprover}
              value={values.isApprover}
              onChange={handleChange}
              onBlur={handleBlur}
            />
          </div>
          <div className="flex flex-col mt-2 w-full">
            <label
              className="text-gray-600 font-bold mb-1"
              htmlFor="labTeamMemberEmail"
            >
              Email ID<span className="text-red-500">* #</span>
            </label>
            <input
              type="text"
              className="border border-gray-300 p-2"
              placeholder="Enter your email"
              name="labTeamMemberEmail"
              value={values.labTeamMemberEmail}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.labTeamMemberEmail && touched.labTeamMemberEmail ? (
              <p className="text-red-500">{errors.labTeamMemberEmail}</p>
            ) : null}
          </div>
          <div className="flex flex-col mt-2 w-full">
            <label
              className="text-gray-600 font-bold mb-1"
              htmlFor="labTeamMemberAddress"
            >
              Address
            </label>
            <input
              type="text"
              className=" h-20 border border-gray-300 p-2 "
              placeholder="Enter your address"
              name="labTeamMemberAddress"
              value={values.labTeamMemberAddress}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            {errors.labTeamMemberAddress && touched.labTeamMemberAddress ? (
              <p className="text-red-500">{errors.labTeamMemberAddress}</p>
            ) : null}
          </div>
          <label className="mt-3 mb-1 text-sm text-gray-600 font-bold">
            <span className="text-red-500">*</span>Mandatory Fields
          </label>
          <label className=" mb-1 text-sm text-gray-600 font-bold">
            <span className="text-red-500">*</span>Email address will be used as
            username to login{" "}
          </label>
          <button
            type="submit"
            className="py-1 px-2 bg-blue-500 text-white flex items-center text-center"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default App;
