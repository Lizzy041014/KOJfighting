// 检查权限（判断当前登录用户是否需要某个权限）
// @param loginUser 当前登录用户
// @param needAccess 需要有的权限、
// @return boolean 有无权限
import ACCESS_ENUM from '@/access/accessEnum'
const checkAccess=(loginUser:any,needAccess:string=ACCESS_ENUM.NOT_LOGIN)=>{
    //获取当前用户具有的权限（如果没有loginUser，则表示未登录）
    const loginUserAccess = loginUser?.userRole ?? ACCESS_ENUM
    if(needAccess===ACCESS_ENUM.NOT_LOGIN){
        return true;
    }
    //如果用户登录才能访问
    if (needAccess===ACCESS_ENUM.USER){
        //如果用户未登录，那么表示无权限
        if(loginUserAccess===ACCESS_ENUM.NOT_LOGIN){
            return false;
        }
    }
    if(needAccess===ACCESS_ENUM.ADMIN){
        //只有管理员才有的权限
        if (loginUserAccess !== ACCESS_ENUM.ADMIN) {
            return false;
        }
    }
    return true
}

export default checkAccess