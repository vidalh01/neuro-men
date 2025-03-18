export class FT {

    static arrX: any[] = []

    static ftEnviar(arr: any[], xdata: any) {
        console.log('ftEnviar');

        arr.unshift(xdata);
    }

    static ftGuardar() {
        console.log('ftGuardar');
    }

    static ftEliminar(arr: any[], index: number) {
        console.log('ftEliminar');

        arr.splice(index, 1);
    }

    static ftEditar() {
        console.log('ftEditar');
    }

    static ftBuscar() {
        console.log('ftBuscar');
    }

}