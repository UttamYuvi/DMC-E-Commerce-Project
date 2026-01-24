import React, { useEffect, useState } from "react";
import serverData from "../../../services/ServerData";

function Profile() {

  const[fname,setFName] = useState('')
  const[lname,setLName] = useState('')
  const[email,setEmail] = useState('')
  const[mobile,setMobile] = useState('')

  const getProfile = async () => {
    const response = await serverData.getVendorProfile()
    console.log(response.data)
  }

  useEffect(() => {
    getProfile()
  },[])

  return (
    <form className="m-4">
    <legend>Your Profile</legend>

    <div class="mb-3">
    <label for="firstName" class="form-label">First Name</label>
    <input type="text" class="form-control" id="firstName" placeholder="Jatin"/>
    </div>

    <div class="mb-3">
    <label for="lastName" class="form-label">Last Name</label>
    <input type="text" class="form-control" id="lastName" placeholder="Arora"/>
    </div>

    <fieldset disabled>
    <div class="mb-3">
    <label for="disabledTextInput" class="form-label">Email address</label>
    <input type="email" class="form-control" id="disabledTextInput" placeholder="jatin@gmail.com"/>
    </div>
    </fieldset>

    <div class="mb-3">
    <label for="mobile" class="form-label">Mobile</label>
    <input type="text" class="form-control" id="mobile" placeholder="+91 9999999999"/>
    </div>

      <button type="submit" className="btn btn-warning">Back</button>
      <button type="submit" className="btn btn-success">Update</button>
    
  
</form>
  )
}

export default Profile;
