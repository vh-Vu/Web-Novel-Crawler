
/*
Input: https://bachngocsach.net.vn/
Output: null
Input: https://bachngocsach.net.vn/truyen/ma-y-than-te
Output: ma-y-than-te
Input: https://bachngocsach.net.vn/truyen/ma-y-than-te/chuong-1278
Output: ma-y-than-te
*/


function getSlugNameorID(pathName,storyPath = "/truyen/",behind=false){
    if(!pathName.includes(storyPath)) return null;
    const novelPath = pathName.slice(storyPath.length);
    const indexOfForwardSlash = novelPath.indexOf("/");
    return  (indexOfForwardSlash === -1) ? novelPath: behind? novelPath.slice(indexOfForwardSlash+1):novelPath.slice(0,indexOfForwardSlash);
}

