import React, { useEffect, useState } from "react";
import serverData from "../../../services/ServerData";
import { useNavigate } from "react-router";
import { toast } from "react-toastify";

function Profile() {

  const navigate = useNavigate()

  const[loading,setLoading] = useState(false)
  const[user,setUser] = useState({
    email:"",
    firstName:"",
    lastName:"",
    mobile:"",
    vendorId:null
  })

  const getProfile = async () => {
    const response = await serverData.getVendorProfile()
    console.log(response.data)
    setUser(response.data)
  }

  const handleChange = (e) => {
    const {name,value} = e.target

    setUser(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const update = async (e) => {
    e.preventDefault();
    setLoading(true);
    try{
      console.log(user.firstName,user.lastName)
      const response = await serverData.updateProfileOfVendor(user)
      console.log(response.data)
      toast.success("profile updated successfully !")
    } catch(err) {
      console.log(err)
      alert("Failed to update profile");
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    getProfile()
  },[])

  return (
    <div className="profile-page">
      <div className="profile-card">
    <div className="m-4">
    <legend>Your Profile</legend>

    <div class="mb-3">
    <label for="firstName" class="form-label">First Name</label>
    <input type="text"
    name="firstName"
    value={user.firstName}
    class="form-control"
    id="firstName"
    onChange={handleChange}
    />
    </div>

    <div class="mb-3">
    <label for="lastName"
    class="form-label">Last Name</label>
    <input type="text"
    name="lastName"
    class="form-control"
    value={user.lastName}
    id="lastName"
    onChange={handleChange}
    />
    </div>

    <fieldset disabled>
    <div class="mb-3">
    <label for="disabledTextInput"
    class="form-label">Email address</label>
    <input type="email"
    class="form-control"
    value={user.email}
    id="disabledTextInput"
    />
    </div>
    </fieldset>

    <div class="mb-3">
    <label for="mobile"
    class="form-label">Mobile</label>
    <input type="text"
    class="form-control"
    name="mobile"
    value={user.mobile}
    id="mobile"
    onChange={handleChange}/>
    </div>

      <div className="profile-actions">
  <button
    className="btn btn-warning"
    onClick={() => navigate("/page/dashboard")}
  >
    Back
  </button>

  <button
    className="btn btn-primary"
    onClick={update}
    disabled={loading}
  >
    {loading ? "Updating..." : "Update"}
  </button>
</div>

  
</div>
</div>
    </div>
  )
}

export default Profile;
