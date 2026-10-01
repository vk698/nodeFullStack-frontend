import React, { useEffect, useState } from "react";
import axiosInstance from "../AxiosInstance";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const [profile, setProfile] = useState(null);
  const [username, setUsername] = useState("");
  const [Age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [edit,setEdit] = useState(false);
  const navigate = useNavigate();
    const handleLogout = async () => {
    try {
      await axiosInstance.post("/auth/logout");
      navigate("/");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };


  const updateProfileImage = async (e) => {
  try {
    const file = e.target.files[0];

    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const res = await axiosInstance.patch(
      "/profile/updateProfile/" + profile._id,
      formData
    );

    setProfile(res.data.data);
  } catch (error) {
    console.log(error);
    setError(
      error.response?.data?.message || "Failed to update profile image"
    );
  }
};
   
  const findProfile = async () => {
    try {
      const res = await axiosInstance.get("/profile/findProfile");

      setProfile(res.data.profile);
      console.log(res.data.profile);

      if (res.data.profile) {
        setUsername(res.data.profile.username);
        setAge(res.data.profile.Age);
        setGender(res.data.profile.gender);
        setImage(res.data.profile.image);
      }
    } catch (error) {
      console.log(error);
      setError(error.response?.data?.message || "Profile not found");
    }
  };

  useEffect(() => {
    findProfile();
  }, []);

  const createProfile = async(e)=>{
    e.preventDefault();
    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("Age", Age);
      formData.append("gender", gender);
      formData.append("image", image);
       console.log("FormData:", formData);
      const res = await axiosInstance.post("/profile/profile", formData);
  }
  catch (error) {
    console.log(error);
    setError(error.response?.data?.message || "Failed to create profile");
  }
  }
  

const deleteProfile = async () => {
  try {
    await axiosInstance.delete("/profile/deleteProfile/" + profile._id);
    setProfile(null);
    setUsername("");
    setAge("");
    setGender("");
    setImage(null);
  } catch (error) {
    console.log(error);
    setError(error.response?.data?.message || "Failed to delete profile");
  }
};




const updateProfile = async () => {
   
  try {
    console.log("Success");
    const res = await axiosInstance.patch("/profile/updateProfile/" + profile._id, {
      username,
      Age,
      gender,
    });
    setProfile(res.data);
    
  } catch (error) {
    return error.response?.data?.message || "Failed to update profile";
  }



}
  return (
    <div className="relative min-h-screen w-screen overflow-hidden bg-black text-white">

      <video
        src="/images/spidey.mp4"
        autoPlay
        loop
        muted
        playsInline
        className="fixed bottom-0 -right-40 h-full w-[45%] object-contain scale-x-[1]"
      />

      <div className=" bg-black/60 " />
        <p className=" text-center text-3xl">My Profile</p>
           {error && (
          <p className="mb-5 text-center font-bold text-red-500">
            {error}
          </p>
        )}

        <div className="mx-auto max-w-lg rounded-2xl border border-red-500/40 bg-black/60 p-8 shadow-xl backdrop-blur-xl">
        {!profile&&(
          
        <div>
            <h2 className="mb-6 text-center text-2xl font-bold">
                Create Profile
              </h2>


               <form onSubmit={createProfile} className="flex flex-col">
                <input
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="mb-4 w-full rounded-xl border border-red-500/40 bg-black/70 p-3 text-white outline-none"
              />


               <input
                type="number"
                placeholder="Age"
                value={Age}
                onChange={(e) => setAge(e.target.value)}
                className="mb-4 w-full rounded-xl border border-red-500/40 bg-black/70 p-3 text-white outline-none"
              />


                 <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="mb-4 w-full rounded-xl border border-red-500/40 bg-black/70 p-3 text-white outline-none"
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>



              <input
              type="file"
              onChange={(e) => setImage(e.target.files[0])}
              className="mb-4 w-full rounded-xl border border-red-500/40 bg-black/70 p-3 text-white outline-none"
              />


            <button
              
              className="rounded-xl bg-red-500/40 p-3 text-white hover:bg-red-500/60"
            >
              Create Profile
            </button>
            </form>
          </div>

              
        )}

        {profile && (
          <div>
             <button onClick={handleLogout} className="text-white hover:text-gray-300  hover:scale-130 transition-transform duration-300 ">
            Logout
          </button>
              {profile.image && (
              <div className="mb-4 text-center">
                <strong>Profile Image:</strong>
                <img
                  src={profile.image}
                  alt="Profile"
                  className="mx-auto mt-2 h-32 w-32 rounded-full object-cover hover:scale-110 transition-transform duration-300"
                />
                <label className="cursor-pointer">
                Edit
               <input
               type="file"
               accept="image/*"
               onChange={updateProfileImage}
              className="hidden"
               />
              </label>
              </div>
            )}
            <h2 className="mb-6 text-center text-2xl font-bold">
              Profile Details
            </h2>
            <p className="mb-4 text-center text-lg">
              <strong>Username:</strong> {profile.username}
            </p>
            <p className="mb-4 text-center text-lg">
              <strong>Age:</strong> {profile.Age}
            </p>
            <p className="mb-4 text-center text-lg">
              <strong>Gender:</strong> {profile.gender}
            </p>
            <div className="flex justify-center">
            <button
              onClick={deleteProfile}
              className="rounded-xl bg-red-500/40 p-3 text-white hover:bg-red-500/60"
            >
              Delete Profile
            </button>
            <button onClick={() => setEdit(!edit)} className="ml-4 rounded-xl bg-blue-500/40 p-3 text-white hover:bg-blue-500/60">
              Edit Profile
            </button>
            </div>
          
          </div>
          
        )}
        {
          edit&&(
            <div>
              <h2 className="mb-6 text-center text-2xl font-bold">
                Edit Profile
              </h2>
              <form onSubmit={updateProfile} className="flex flex-col">
                <input
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="mb-4 w-full rounded-xl border border-red-500/40 bg-black/70 p-3 text-white outline-none"
                />
                <input
                  type="number"
                  placeholder="Age"
                  value={Age}
                  onChange={(e) => setAge(e.target.value)}
                  className="mb-4 w-full rounded-xl border border-red-500/40 bg-black/70 p-3 text-white outline-none"
                />
                <select
                  value={gender}
                  onChange={(e) => setGender(e.target.value)}
                  className="mb-4 w-full rounded-xl border border-red-500/40 bg-black/70 p-3 text-white outline-none"
                >
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              
                <button 
                type="submit"
              
               className="mb-4 rounded-xl bg-gray-500/40 p-3 text-white hover:bg-gray-500/60">
                  Update Profile
                </button>
              </form>
            </div>
          )
        }
       

        </div>
    </div>
  );
}