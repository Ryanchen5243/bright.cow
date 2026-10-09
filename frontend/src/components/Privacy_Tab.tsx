import styles from './Privacy_Tab.module.css';

import Switch from '@mui/material/Switch';
import {
  LuEye,
  LuMessagesSquare,
  LuCalendar,
  LuShieldCheck
} from "react-icons/lu";

function Privacy_Tab(){
  return(
    
    <div className={styles.container}>

      <div className={styles.big_box}> 
        <div className={styles.box_header}> 
          <div className={styles.setting_icon}>
            <LuEye />
          </div>
          Online Visibility
        </div>
        <div className={styles.sub_header}>Decide who can see your online status </div>
        <div className={styles.sub_box}>
          <div className={styles.sub_box_header}>Show last online </div>
          <div className={styles.sub_header}> Allow others to see when you were last online</div>
          <div>
            <Switch />
          </div>
        </div>
        
      </div>

      <div className={styles.big_box}> 
        <div className={styles.box_header}>
          <div className={styles.setting_icon}>
            <LuMessagesSquare />
          </div>
          Messaging
        </div>
        <div className={styles.sub_header}></div>
        <div className={styles.sub_box}>
          <div className={styles.sub_box_header}> Who Can Message Me?</div>
          <div> Control who can message you</div>
        </div>
      </div>

      <div className={styles.big_box}> 
        <div className={styles.box_header}>
          <div className={styles.setting_icon}>
            <LuCalendar /> 
          </div>
          Booking
        </div>
        <div className={styles.sub_header}> </div>
        <div className={styles.sub_box}>
          <div className={styles.sub_box_header}> Allow Booking Requests</div>
            
        </div>
        <div>
            <Switch />
        </div>
      </div>

      <div className={styles.big_box}> 
        <div className={styles.box_header}>
          <div className={styles.setting_icon}>
            <LuShieldCheck />
          </div>
          Safety
        </div>
        <div className={styles.sub_header}> </div>
        <div className={styles.sub_box}>
          <div className={styles.sub_box_header}> Blocked Users</div>
            
        </div>
        <div className={styles.sub_header}> </div>
        <div className={styles.sub_box}>
          <div className={styles.sub_box_header}> Muted Users</div>
            
        </div>
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
export default Privacy_Tab;