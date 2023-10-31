
const splitCookies=(name)=>{
    let cookies=document.cookie.split(';');
    for(const cookie of cookies){
        const [cookieName,cookieValue]=cookie.trim().split('=');
        if(cookieName==='data'&& name==='data'){
            return cookieValue;
        }
        if(cookieName===name){
            return decodeURI(cookieValue);
        }
    }
    return null;
}
const hasLowCaseChar=(temp)=>{
    return /[A-Z]/.test(temp);
}
const hasUpCaseChar=(temp)=>{
    return /[a-z]/.test(temp);
}
const hasSpecialChar=(temp)=>{
    return /[!@#$%^&*-_+=`~?/]/.test(temp);
}
const hasNumbers=(temp)=>{
    return /\d/.test(temp);
}
const isValidEmail = (email) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
};

export {splitCookies,hasLowCaseChar,hasUpCaseChar,hasSpecialChar,hasNumbers,isValidEmail};