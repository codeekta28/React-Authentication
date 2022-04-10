function calculateRemainingTime(expireTime){
    const currentTime=new Date().getTime();
    // to convert the string to millisecons
    const adjustexpireTime=new Date(expireTime).getTime()
    const remainingTime=adjustexpireTime-currentTime;
    return remainingTime
}

function retriveStoredToken(){
    const storedToken=localStorage.getItem('token');
    const localExpirationTime=localStorage.getItem('expirationTime');
    const remainingTime=calculateRemainingTime(localExpirationTime);

    // if remaining time is less than 1 min than remove token and time from local storage
    if(remainingTime<60000){
        localStorage.removeItem('token')
        localStorage.removeItem('expirationTime');
        return null
    }
    // when thr time is more than one min
    return {
        token:storedToken,
        timeLeft:remainingTime,
    }

}
export {calculateRemainingTime,retriveStoredToken}