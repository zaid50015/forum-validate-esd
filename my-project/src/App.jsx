import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { labTeamMemberSchema } from "./assets/schema/labTeamMemberSchema";
import { useParams } from "react-router-dom";
import axios from "axios";
const App = () => {
  const initialValues = {
    isApprover:"",
    labTeamMemberAddress:"",
    // labTeamMemberContactNumber:"",
    labTeamMemberEmail:"",
    labTeamMemberName:"",
    labLocationName:"",
    roleName:"",
  };
  const [loading, setLoading] = useState(true);
  const id = parseInt(useParams().id);
  // const { usrEmail: usrId } = getUser()
  const usrId = 80;
  const [extraData,setExtraData]=useState({})
  const {
    values,
    handleBlur,
    handleChange,
    handleSubmit,
    errors,
    touched,
    setValues,
  } = useFormik({
    initialValues,
    validationSchema: labTeamMemberSchema,
    validateOnChange: true,
    validateOnBlur: false,
    //// By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: async (values, action) => {
      const data={...values,...extraData};
      console.log(data)
      try {
        const response = await axios.put(
            "http://localhost:8080/trakmeserver/api/external/labTeamMember/update",
            data
        );
    } catch (e) {
        console.log(e)
    }
    },
  });
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    console.log(id, usrId);
    try {
      const response = await axios.get(
        "http://localhost:8080/trakmeserver/api/external/labTeamMember/get",
        {
          params: {
            id,
            usrId,
          },
        }
      );

      if (response?.data) {
        const {
          isApprover,
          labTeamMemberAddress,
          labTeamMemberEmail,
          labTeamMemberName,
          labLocationName,
          roleName,
          roleId,
          labLocationId,
        } = response?.data;
       setExtraData({roleId,labLocationId,labTeamMemberContactNumber:'999956135',usrId,id})
        setValues({
          isApprover,
          labTeamMemberAddress,
          // labTeamMemberContactNumber,
          labTeamMemberEmail,
          labTeamMemberName,
          labLocationName,
          roleName,
        });
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching work order data:", error);
    }
  }



  return (
    <>
      {!loading ? (
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
              {/* <div className="flex flex-col mt-2 w-full">
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
              </div> */}
              <div className="flex flex-col mt-2 w-full">
                <label
                  className="text-gray-600 font-bold mb-1"
                  htmlFor="roleName"
                >
                  Role<span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  className=" border border-gray-300 p-2 "
                  placeholder="Enter your role"
                  name="roleName"
                  value={values.roleName}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {errors.roleName && touched.roleName ? (
                  <p className="text-red-500">{errors.roleName}</p>
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
                <span className="text-red-500">*</span>Email address will be
                used as username to login{" "}
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
      ) : (
        <p>Loading</p>
      )}
    </>
  );
};

export default App;
