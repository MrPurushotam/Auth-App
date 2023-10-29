
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
export {splitCookies};