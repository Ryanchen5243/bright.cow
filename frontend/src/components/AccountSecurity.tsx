{/*
import { Routes, Route } from "react-router-dom";
import Settings from "./Settings";
*/}
import "./AccountSecurity.css";
import { FaPhone } from "react-icons/fa";

function AccountSecurity(){
  return(
    
    <div className="container">

      <div className="box"> Email Address
        <div className="sub_box">

        </div>
        <div>
          <button>Change Email</button>
        </div>
      </div>

      <div className="box"> Phone Number
        <FaPhone />
        <div className="sub_box">

        </div>
      </div>

      <div className="box"> Password
        <div className="sub_box">

        </div>
        <button>Change Password</button>
      </div>

      <div className="box"> Two-Factor Authentication
        
        <button>Manage 2FA</button>
      </div>

      <div className="big_box"> Login Devices
        <div className="devices_box">

        </div>
        <button>Manage Devices</button>
      </div>

      <div className="big_box"> Account Deletion
        
        <button className = "accDel">Delete Account</button>
      </div>

    </div>

  )
}
{/*
function displayEmail(String: email){

}
function displayPhoneNumbers(){

}
function displayLoginDevices(){

}
*/}
export default AccountSecurity;