import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { labTeamMemberSchema } from "./assets/schema/labTeamMemberSchema";
import { useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const App = () => {
  const initialValues = {
    labLocationName: "",
    labLocationIdentifier: "",
    labLocationLeadName: "",
    labLocationEmail: "",
    labLocationContactNumber: "",
    labLocationAddress: "",
    labLocationDescription: ""
  };
  
  const updateTeamMembers = async (data, action) => {
    try {
      const response = await axios.put(
        "http://localhost:8080/trakmeserver/api/external/labLocation/update",
        data
      );
      toast.success('Updated Sucessfully', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    } catch (error) {
      console.error(error, "Catch executed")
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }
  }
  const [loading, setLoading] = useState(true);
  const id = parseInt(useParams().id);
  // const { usrEmail: usrId } = getUser()
  const usrId = "pushyamitra.poonia@gmail.coma";
  const [extraData, setExtraData] = useState({})
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
    validateOnBlur: true,
    //// By disabling validation onChange and onBlur formik will validate on submit.
    onSubmit: (values, action) => {
      const data = { ...values, ...extraData };
      
      updateTeamMembers(data, action)
    },
  });
  useEffect(() => {
    fetchData();
  }, []);
  async function fetchData() {
    console.log(id, usrId);
    try {
      const response = await axios.get(
        "http://localhost:8080/trakmeserver/api/external/labLocation/get",
        {
          params: {
            id,
            usrId,
          },
        }
      );

      if (response?.data) {
        const {
          labLocationAddress,
          labLocationContactNumber,
          labLocationDescription,
          labLocationEmail,
          labLocationIdentifier,
          labLocationLeadInitial,
          labLocationLeadName,
          labLocationName,

        } = response?.data;
        setExtraData({ labLocationLeadInitial, usrId, id })
        setValues({
          labLocationName,
          labLocationIdentifier,
          labLocationLeadName,
          labLocationEmail,
          labLocationContactNumber,
          labLocationAddress,
          labLocationDescription
        });
        setLoading(false);
      }

    } catch (error) {
      console.error("Error fetching work order data:", error);
      toast.error(error.message, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",

      });
    }
  }



  return (
    <>

      <div className="bg-slate-200  min-h-screen px-10 py-4">
        <div className=" text-gray-600 font-bold">
          Lab Location{" "}
          <span className="text-sm text-gray-400">
            (<span style={{ fontSize: "0.8em" }}>EDIT</span>)
          </span>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col text-gray-500  items-start h-50 bg-white border-t-2 border-blue-600 p-4 rounded-md">
            <h1 className="text-left mb-2">Manage Lab Location Details</h1>
            <div className="w-full h-px bg-slate-200"></div>

            {/* Input field with label */}
            <div className="flex flex-col mt-2 w-full">
              <div className="flex flex-row w-full justify-between">
                <label
                  className="text-gray-600 font-bold mb-1"
                  htmlFor="labLocationName"
                >
                  Lab Name<span className="text-red-500">*</span>:
                </label>
                {errors.labLocationName && touched.labLocationName ? (
                  <p className="text-red-500">{errors.labLocationName}</p>
                ) : null}
              </div>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded disabled:cursor-not-allowed"
                placeholder="Enter your Lab Name"
                name="labLocationName"
                disabled
                value={values.labLocationName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <div className="flex flex-col mt-2 w-full">
              <div className="flex flex-row w-full justify-between">
                <label
                  className="text-gray-600 font-bold mb-1"
                  htmlFor="labLocationIdentifier"
                >
                  Lab Id<span className="text-red-500">*</span>:
                </label>
                {errors.labLocationIdentifier && touched.labLocationIdentifier ? (
                  <p className="text-red-500">{errors.labLocationIdentifier}</p>
                ) : null}
              </div>
              <input
                type="text"
                className="border border-gray-300 p-2 rounded disabled:cursor-not-allowed"
                placeholder="Enter the lablocation id"
                name="labLocationIdentifier"
                disabled
                value={values.labLocationIdentifier}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <div className="flex flex-col mt-2 w-full">
              <div className="flex flex-row w-full justify-between">
                <label
                  className="text-gray-600 font-bold mb-1"
                  htmlFor="labLocationLeadName"
                >
                  Lead Name<span className="text-red-500">*</span>
                </label>
                {errors.labLocationLeadName ? (
                  <p className="text-red-500">
                    {errors.labLocationLeadName}
                  </p>
                ) : null}
              </div>
              <input
                type="text"
                className=" border border-gray-300 p-2 rounded "
                placeholder="Enter your lead name"
                name="labLocationLeadName"
                value={values.labLocationLeadName}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>




            <div className="flex flex-col mt-2 w-full">
              <div className="flex flex-row w-full justify-between">
                <label
                  className="text-gray-600 font-bold mb-1"
                  htmlFor="labLocationEmail"
                >
                  Email ID<span className="text-red-500">* #</span>
                </label>
                {errors.labLocationEmail ? (
                  <p className="text-red-500">{errors.labLocationEmail}</p>
                ) : null}
              </div>
              <input
                type="email"
                className="border border-gray-300 p-2 rounded"
                placeholder="Enter lab location email"
                name="labLocationEmail"
                
                value={values.labLocationEmail}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>


            <div className="flex flex-col mt-2 w-full">
              <div className="flex flex-row w-full justify-between">
                <label
                  className="text-gray-600 font-bold mb-1"
                  htmlFor="labLocationContactNumber"
                >
                  Contact Number<span className="text-red-500">* </span>
                </label>
                {errors.labLocationContactNumber? (
                  <p className="text-red-500">{errors.labLocationContactNumber}</p>
                ) : null}
              </div>
              <input
                type="number"
                className="border border-gray-300 p-2 rounded"
                placeholder="Enter lab location contact number"
                name="labLocationContactNumber"
                
                value={values.labLocationContactNumber}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <div className="flex flex-col mt-2 w-full">
              <div className="flex flex-row w-full justify-between">
                <label
                  className="text-gray-600 font-bold mb-1"
                  htmlFor="labLocationAddress"
                >
                  Address  <span className="text-red-500">*</span>
                </label>
                {errors.labLocationAddress ? (
                  <p className="text-red-500">{errors.labLocationAddress}</p>
                ) : null}
              </div>
              <textarea
                type="text"
                className=" h-20 border border-gray-300 p-2 rounded"
                placeholder="Enter lab address"
                name="labLocationAddress"
                value={values.labLocationAddress}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>

            <div className="flex flex-col mt-2 w-full">
              <div className="flex flex-row w-full justify-between">
                <label
                  className="text-gray-600 font-bold mb-1"
                  htmlFor="labLocationDescription"
                >
                  Description
                </label>
                {errors.labLocationDescription? (
                  <p className="text-red-500">{errors.labLocationDescription}</p>
                ) : null}
              </div>
              <textarea
                type="text"
                className=" h-20 border border-gray-300 p-2 rounded"
                placeholder="Enter description"
                name="labLocationDescription"
                value={values.labLocationDescription}
                onChange={handleChange}
                onBlur={handleBlur}
              />
            </div>



            <label className="mt-3 mb-1 text-sm text-gray-600 font-bold">
              <span className="text-red-500">*</span>Mandatory Fields
            </label>
            <button
              type="submit"
              // className="py-1 px-2 bg-blue-500 text-white flex items-center text-center"
              className="float-start mt-10 flex sm:w-full lg:w-1/3  justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">

              Update
            </button>
          </div>
        </form>
      </div>
      <ToastContainer />
    </>
  );
};

export default App;
