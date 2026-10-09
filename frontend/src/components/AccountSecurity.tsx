import { useEffect, useState } from "react";
import axios from "axios";
import styles from './AccountSecurity.module.css';
import Switch from '@mui/material/Switch';
import {
  LuPhone,
  LuMail,
  LuLockKeyhole,
  LuComputer,
  LuTriangleAlert,
  LuShieldCheck
} from "react-icons/lu";
import { useAuth } from "../contexts/authContext";
import { updatePassword } from "firebase/auth";
import {use2FA} from './twoFactorAuth.tsx';


function AccountSecurity(){

  type Device = {
    userAgent: string;
    id: number;
    name: string;
    signInLocation: string;
  }

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNumbers, setPhoneNumbers] = useState<string[]>([]);
  const [devices, setDevices] = useState<Device[]>([]);
  const {currentUser} = useAuth();
  const { qrCode, setup2FA } = use2FA();

  // async function displayEmail(){
  //   const response = await axios.get("/api/userEmail");
  //   return response.data;
  // }

  async function displayDevices(){
    const response = await axios.get("/api/device");
    console.log(response.data);
    return response.data;
  }

  useEffect(() => {
    displayDevices().then((device) => {
        setDevices((prev) => [...prev, device]);
    });
}, []);

  const changePassword = async (newPassword: string) => {
    if(!currentUser) return;
    try{
      await updatePassword(currentUser, newPassword);
    } catch (error) {
      console.error(error)
    }
  };

  return(
    
    <div className={styles.container}>

      <div className={styles.box}> 
        <div className={styles.box_header}>
          <div className={styles.setting_icon}>
            <LuMail />
          </div>
          Email Address 
        </div>
        <div className={styles.sub_header}> This is the email associated with your account</div>
        <div className={styles.sub_box}>
          {currentUser?.email}
        </div>
        <div>
          <button className={styles.button}>Change Email</button>
        </div>
      </div>

      <div className={styles.box}> 
        <div className={styles.box_header}>
          <div className={styles.setting_icon}>
            <LuPhone />
          </div>
          Phone Number
        </div>
        <div className={styles.sub_header}> Add a phone number to secure your account and recover it easily</div>
        <div className={styles.sub_box}>

        </div>
      </div>

      <div className={styles.box}> 
        <div className={styles.box_header}>
          <div className={styles.setting_icon}>
            <LuLockKeyhole />
          </div>
          Password
        </div>
        <div className={styles.sub_header}> Ensure your account is using a strong password</div>
        <div className={styles.sub_box}>

        </div>
        {/* click change password, enter authentication code, then change the password, then notify them via email */}
        <button className={styles.button} /*onClick={() => changePassword(newPassword)}*/>Change Password</button>
      </div>

      <div className={styles.box}> 
        <div className={styles.box_header}>
          <div className={styles.setting_icon}>
            <LuShieldCheck />
          </div >
          Two-Factor Authentication
        </div>
        <div className={styles.sub_header}> Add an extra layer of security to your account</div>
        <div>
          <Switch />
        </div>
        <button onClick={setup2FA} className={styles.button} >Setup 2FA</button>
        {qrCode && (
          <img src={qrCode} alt="2FA QR Code" />
        )}
      </div>

      <div className={styles.big_box}>
        <div className={styles.box_header}>
          <div className={styles.setting_icon}>
            <LuComputer />
          </div> 
          Login Devices
        </div>
        <div className={styles.sub_header}> These are the devices that are currently logged into your account</div>
        <div className={styles.devices_box}>
          {devices.map((device, index) => (
            <div key={index}>
              {device.userAgent}
            </div>
          ))}
        </div>
        <button className={styles.button}>Manage Devices</button>
      </div>

      <div className={styles.big_box}> 
        <div className={styles.box_header}>
          <LuTriangleAlert 
          style={{ 
            color: "red",
            width: "23px",
            height: "23px"
          }}/>
          Account Deletion
        </div>
        <div className={styles.sub_header}> Permanently delete your account and all its data</div>
        <button className={styles.accDel}>Delete Account</button>
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