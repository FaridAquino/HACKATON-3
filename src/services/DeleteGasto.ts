import Api from "@services/api";

export async function BorrarGasto(id:number) {
    try {
           const api = await Api.getInstance()
            api.delete( {
            url: `/expenses/${id}`,
    })
    return true; // indica exito
        
    } catch (error) {
        console.log("No se pudo borrar, revisa tu codigo");
        return false;
    }

}
