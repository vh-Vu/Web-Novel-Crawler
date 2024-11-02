


/*
Input: https://bachngocsach.net.vn/
Output: null
Input: https://bachngocsach.net.vn/truyen/ma-y-than-te
Output: ma-y-than-te
Input: https://bachngocsach.net.vn/truyen/ma-y-than-te/chuong-1278
Output: ma-y-than-te
*/
function getSlug(pathName,path = "/truyen/"){
    if(!pathName.includes(path)) return null;
    let novelPath = pathName.slice(path.length);
    let indexOfForwardSlash = novelPath.indexOf("/")
    return  (indexOfForwardSlash === -1) ? novelPath: novelPath.slice(0,indexOfForwardSlash);
}