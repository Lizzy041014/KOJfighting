// 检查权限（判断当前登录用户是否需要某个权限）
// @param loginUser 当前登录用户
// @param needAccess 需要有的权限、
// @return boolean 有无权限
import ACCESS_ENUM from '@/access/accessEnum'
const checkAccess=(loginUser:any,needAccess:string=ACCESS_ENUM.NOT_LOGIN)=>{
    const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM
    if(needAccess===ACCESS_ENUM.NOT_LOGIN){
        return true;
    }

    if (needAccess===ACCESS_ENUM.USER){
        if(loginUserAccess===ACCESS_ENUM.NOT_LOGIN){
            return false;
        }
    }

    if(needAccess===ACCESS_ENUM.ADMIN){
        if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
            return false;
        }
    }
    return true
}
export default checkAccess