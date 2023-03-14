import jwtDecode from 'jwt-decode';


const decode_jwt = (token: string) => {
    const decoded = jwtDecode(token);
    return decoded
}

export default decode_jwt;