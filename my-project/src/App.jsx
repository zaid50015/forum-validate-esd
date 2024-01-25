import { useFormik } from 'formik';
import React from 'react';

const App = () => {

  const initialValues = {
    name: "",
    email: "",
    password: "",
    confirm_password: "",
  };

  const { values, handleBlur, handleChange, handleSubmit, errors, touched } =
    useFormik({
      initialValues,
      // validationSchema: signupSchema,
      validateOnChange: true,
      validateOnBlur: false,
      //// By disabling validation onChange and onBlur formik will validate on submit.
      onSubmit: (values, action) => {
        console.log("🚀 ~ file: App.jsx ~ line 17 ~ App ~ values", values);
        //// to get rid of all the values after submitting the form
        action.resetForm();
      },
    });
  return (
    <div className='bg-slate-200 px-10 py-4'>
      <div className=' text-gray-600 font-bold'>
        Lab Team Member <span className='text-sm text-gray-400'>(<span style={{ fontSize: '0.8em' }}>EDIT</span>)</span>
      </div>
      <form action="">
      <div className='flex flex-col text-gray-500  items-start h-50 bg-white border-t-2 border-blue-600 p-4 rounded-md'>
        <h1 className='text-left mb-4'>
          Manage Lab Team Member Details
        </h1>
         
        {/* Input field with label */}
        <div className='flex flex-col mt-2 w-full'>
          <label className='text-gray-600 font-bold mb-1' htmlFor='labTeamMemberName'>
            Team Member Name<span className='text-red-500'>*</span>:
          </label>
          <input
            type='text'
            className='border border-gray-300 p-2 '
            placeholder='Enter your name'
            name='labTeamMemberName'
          />
        </div>
        <div className='flex flex-col mt-2 w-full'>
          <label className='text-gray-600 font-bold mb-1'>
            Lab Location<span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            className='border border-gray-300 p-2 '
            placeholder='' 
          />
        </div>
        <div className='flex flex-col mt-2 w-full'>
          <label className='text-gray-600 font-bold mb-1'>
            Contact Number<span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            className=' border border-gray-300 p-2 '
            placeholder='' 
          />
        </div>
        <div className='flex flex-col mt-2 w-full'>
          <label className='text-gray-600 font-bold mb-1'>
            Role<span className='text-red-500'>*</span>
          </label>
          <input
            type='text'
            className=' border border-gray-300 p-2 '
            placeholder='' 
          />
        </div>
        <div className='flex flex-row items-center mt-2 w-full'>
          <label className='text-gray-600 font-bold'>
            Approver:
          </label>
          <input
            type='checkbox'
            className='mt-2 ml-1 border border-gray-300' required
          />
        </div>
        <div className='flex flex-col mt-2 w-full'>
          <label className='text-gray-600 font-bold mb-1'>
            Email ID<span className='text-red-500'>* #</span>
          </label>
          <input
            type='text'
            className='border border-gray-300 p-2'
            placeholder='' required
          />
        </div>
        <div className='flex flex-col mt-2 w-full'>
          <label className='text-gray-600 font-bold mb-1'>
            Address
          </label>
          <input
            type='text'
            className=' h-20 border border-gray-300 p-2 '
            placeholder=''
          />
        </div>
        <label className='mt-3 mb-1 text-sm text-gray-600 font-bold'><span className='text-red-500'>*</span>Mandatory Fields</label>
        <label className=' mb-1 text-sm text-gray-600 font-bold'><span className='text-red-500'>*</span>Email address will be used as username to login </label>
        <button className='py-1 px-2 bg-blue-500 text-white flex items-center text-center'>Submit</button>
        
      </div>
      </form>
    </div>
  );
}

export default App;