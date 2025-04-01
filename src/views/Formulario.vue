<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { LCS } from "../class/lib_localstoraje";

const clave = "datos-personas"
let arrPersona: any[] = []

interface Persona {
    nombre: string;
    vinculo: string;
    detalle: any[];
}

const persona = ref<Persona>({
    nombre: '',
    vinculo: '',
    detalle: [],
});

const ftSend = () => {

    let arrDetalle: any[] = []
    arrDetalle.push(persona.value.detalle)

    const newPersona = ref<Persona>({
        nombre: persona.value.nombre,
        vinculo: persona.value.vinculo,
        detalle: arrDetalle,
    });

    LCS.addDataItem(arrPersona, clave, newPersona.value)
    // reset
    persona.value.nombre = ""
    persona.value.vinculo = ""
    persona.value.detalle = []

    alert("Persona agregada correctamente");
};

onMounted(() => {
    arrPersona = LCS.getData(clave)
});

</script>

<template>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8 col-lg-6">
                <!-- Título del formulario -->
                <h2 class="text-center mb-4">Formulario</h2>

                <div class="card shadow-sm p-4">
                    <!-- Campo Nombre -->
                    <div class="mb-3">
                        <label for="nombre" class="form-label">Nombre</label>
                        <input type="text" class="form-control" id="nombre" v-model="persona.nombre" required
                            placeholder="Ingresa el nombre" />
                    </div>

                    <!-- Campo Vinculo -->
                    <div class="mb-3">
                        <label for="vinculo" class="form-label">Vínculo</label>
                        <input type="text" class="form-control" id="vinculo" v-model="persona.vinculo" required
                            placeholder="Ingresa el vínculo" />
                    </div>

                    <!-- Campo Detalle -->
                    <div class="mb-3">
                        <label for="detalle" class="form-label">Detalle</label>
                        <textarea class="form-control" id="detalle" v-model="persona.detalle" rows="4" required
                            placeholder="Agrega detalles relevantes"></textarea>
                    </div>

                    <!-- Botón Agregar -->
                    <div class="d-grid gap-2">
                        <button class="btn btn-primary btn-lg" @click="ftSend">Agregar</button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>