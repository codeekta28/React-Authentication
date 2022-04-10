import React from "react";
import ProfileForm from "./ProfileForm";
import styles from "./UserProfile.module.css";


function UserProfile() {

  return (
    <div className={styles.profile}>
      <h1>User Profile</h1>
      <ProfileForm />
    </div>
  );
}

export default UserProfile;
