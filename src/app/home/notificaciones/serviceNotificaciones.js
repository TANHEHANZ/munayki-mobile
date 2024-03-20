import { peticionPost } from "../../../utilitis/postRequest";

export const notificar = async (user) => {
    try {
        const conctUser = await peticionPost("traerContactos/" + user.login[0].id, {
            nombre: user.login[0].nombre,
            apellido: user.login[0].apellido,
            telefono: user.login[0].telefono
        }, "POST");
        console.log("token de user", user, "tokens", conctUser);
    } catch (error) {
        console.error("Error al obtener los datos del usuario:", error);
    }
};