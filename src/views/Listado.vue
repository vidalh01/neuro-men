<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { LCS } from "../class/lib_localstoraje";

let newDetails = ref<string>("");
const clave = "datos-personas";
let arrPersona = ref<any[]>([]);
let indexDelete = -1;
let modeEdit = ref(false);

interface Persona {
    nombre: string,
    vinculo: string,
    detalle: any[],
}

let personaDetallada = ref<Persona>({
    nombre: '',
    vinculo: '',
    detalle: []
});

function ftshowDetails(index: number) {
    personaDetallada.value = arrPersona.value[index];
};

function ftDelete() {
    LCS.remDataItem(arrPersona.value, clave, indexDelete);
    indexDelete = -1;
};

function ftSaveIndexDelete(index: number) {
    indexDelete = index;
};

function ftAddDetails(arrDetalle: any[]) {
    LCS.addDataItemLv2(arrPersona.value, arrDetalle, clave, newDetails.value, true);
    // reset
    newDetails.value = "";
};

function ftEliminarDetalle(index: number, arr: any[]) {
    if (confirm("¿Estás seguro de eliminar esto?")) {
        LCS.remDataItemLv2(arrPersona.value, arr, clave, index);
    } else {
        console.log("Cancelado");
    }
};

function ftEditarDetalle(index: number, item: string) {
    modeEdit.value = true;
    newDetails.value = item;
    indexDelete = index;
};

function ftSaveEditDetails(arr: any[]) {
    modeEdit.value = false;
    arr[indexDelete] = newDetails.value;
    LCS.setData(arrPersona.value, clave);
    indexDelete = -1;
    newDetails.value = "";
};

function ftModeEditDisabled() {
    modeEdit.value = false;
};

onMounted(() => {
    arrPersona.value = LCS.getData(clave);
});

</script>

<template>

    <div class="card mb-3">
        <div class="card-header text-center">
            Listado de todas las personas agregadas
        </div>
        <div class="card-body">
            <h5 class="card-title text-center">Lista</h5>
            <div class="container">
                <div v-if="arrPersona.length > 0" class="list-group">
                    <div v-for="(persona, index) in arrPersona" :key="index"
                        class="list-group-item my-3 d-flex justify-content-between align-items-center">
                        <div>
                            <h5>{{ persona.nombre }}</h5>
                            <p><strong>Vínculo:</strong> {{ persona.vinculo }}</p>
                            <p><strong>Detalle:</strong> {{ persona.detalle[persona.detalle.length - 1] }}</p>
                        </div>
                        <div class="d-flex gap-2 flex-column">
                            <button @click="ftSaveIndexDelete(index)" data-bs-toggle="modal"
                                data-bs-target="#modalEliminarPersona" class="btn btn-danger btn-sm">
                                <svg width="16" height="16" fill="currentColor" class="bi bi-trash3"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                </svg>
                            </button>
                            <button @click="ftshowDetails(index)" data-bs-toggle="modal" data-bs-target="#modalDetalles"
                                class="btn btn-primary btn-sm">
                                <svg width="16" height="16" fill="currentColor" class="bi bi-pencil-square"
                                    viewBox="0 0 16 16">
                                    <path
                                        d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                    <path fill-rule="evenodd"
                                        d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </div>
                <p v-else class="text-center">No hay personas agregadas.</p>
            </div>
        </div>
    </div>

    <!-- Modal -->
    <div class="modal fade" id="modalDetalles" tabindex="-1" aria-labelledby="modalDetallesLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modalDetallesLabel"><strong>Nombre:</strong> {{
                        personaDetallada.nombre }}
                        <p><strong>Vínculo:</strong> {{ personaDetallada.vinculo }}</p>

                    </h1>

                    <button @click="ftModeEditDisabled()" type="button" class="btn-close" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label id="detalles" class="form-label">+ Detalles</label>
                        <textarea v-model="newDetails" class="form-control" id="detalle" rows="4"
                            placeholder="Agrega detalles relevantes"></textarea>

                        <button v-if="modeEdit" class="btn btn-secondary w-100 mt-4" @click="ftSaveEditDetails(personaDetallada.detalle)
                            ">Editar Detalle</button>

                        <button v-if="!modeEdit" @click="ftAddDetails(personaDetallada.detalle)"
                            class="btn btn-primary w-100 mt-4">Guardar Detalle</button>
                    </div>

                    <div class="my-3" v-for="(detalle_item, index) in personaDetallada.detalle" :key="index">
                        <div class="card p-4">
                            ✅ : {{ detalle_item }}
                            <div class="btn-group d-flex justify-content-center py-3">

                                <a href="#detalles" class="btn btn-light border border-1"
                                    @click="ftEditarDetalle(index, detalle_item)">

                                    <svg width="16" height="16" fill="currentColor" class="bi bi-pencil-square"
                                        viewBox="0 0 16 16">
                                        <path
                                            d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fill-rule="evenodd"
                                            d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z" />
                                    </svg>

                                </a>

                                <button class="btn btn-light border border-1 h-25"
                                    @click="ftEliminarDetalle(index, personaDetallada.detalle)">
                                    <svg width="16" height="16" fill="currentColor" class="bi bi-trash3"
                                        viewBox="0 0 16 16">
                                        <path
                                            d="M6.5 1h3a.5.5 0 0 1 .5.5v1H6v-1a.5.5 0 0 1 .5-.5M11 2.5v-1A1.5 1.5 0 0 0 9.5 0h-3A1.5 1.5 0 0 0 5 1.5v1H1.5a.5.5 0 0 0 0 1h.538l.853 10.66A2 2 0 0 0 4.885 16h6.23a2 2 0 0 0 1.994-1.84l.853-10.66h.538a.5.5 0 0 0 0-1zm1.958 1-.846 10.58a1 1 0 0 1-.997.92h-6.23a1 1 0 0 1-.997-.92L3.042 3.5zm-7.487 1a.5.5 0 0 1 .528.47l.5 8.5a.5.5 0 0 1-.998.06L5 5.03a.5.5 0 0 1 .47-.53Zm5.058 0a.5.5 0 0 1 .47.53l-.5 8.5a.5.5 0 1 1-.998-.06l.5-8.5a.5.5 0 0 1 .528-.47M8 4.5a.5.5 0 0 1 .5.5v8.5a.5.5 0 0 1-1 0V5a.5.5 0 0 1 .5-.5" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    </div>

    <!-- Modal Eliminar -->
    <div class="modal fade" id="modalEliminarPersona" tabindex="-1" aria-labelledby="modalEliminarPersonaLabel">
        <div class="modal-dialog">
            <div class="modal-content">
                <div class="modal-header">
                    <h1 class="modal-title fs-5" id="modalEliminarPersonaLabel">Eliminar</h1>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    Quieres borrar a esta persona?
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-danger" data-bs-dismiss="modal">Close</button>
                    <button type="button" class="btn btn-primary" data-bs-dismiss="modal"
                        @click="ftDelete()">Eliminar</button>
                </div>
            </div>
        </div>
    </div>
</template>