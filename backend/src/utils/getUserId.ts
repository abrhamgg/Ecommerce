import jwt from "jsonwebtoken";


const getUserId = (token:string) => {
    const decoded:any = jwt.decode(token);
    return decoded['user']['id'];
}

export default getUserId;