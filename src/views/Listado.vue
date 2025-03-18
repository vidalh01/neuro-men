<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { LCS } from "../class/lib_localstoraje";

let newDetails = ""
const clave = "datos-personas"
let arrPersona = ref<any[]>([])
let indexDetails = -1

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
    indexDetails = index
};

function ftDelete(index: number) {
    LCS.remData(arrPersona.value, clave, index)
};

function ftAddDetails(arrDetalle: any[]) {
    arrDetalle.push(newDetails)
    LCS.setData(clave, arrPersona.value)

    newDetails = ""
};

onMounted(() => {
    arrPersona.value = LCS.getData(clave)
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
                            <p><strong>Detalle:</strong> {{ persona.detalle[0] }}</p>
                        </div>
                        <div class="d-flex gap-2 flex-column">
                            <button @click="ftDelete(index)" class="btn btn-danger btn-sm">
                                Eliminar
                            </button>
                            <button @click="ftshowDetails(index)" data-bs-toggle="modal" data-bs-target="#modalDetalles"
                                class="btn btn-primary btn-sm">
                                Detalles
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

                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    <div class="mb-3">
                        <label class="form-label">+ Detalles</label>
                        <textarea v-model="newDetails" class="form-control" id="detalle" rows="4"
                            placeholder="Agrega detalles relevantes"></textarea>

                        <button @click="ftAddDetails(personaDetallada.detalle)"
                            class="btn btn-primary w-100 mt-4">Guardar Detalle</button>
                    </div>

                    <p v-for="(detalle_item, index) in personaDetallada.detalle" :key="index">
                        <strong>✅ :</strong> {{ detalle_item }}
                    </p>
                </div>

            </div>
        </div>
    </div>
</template>