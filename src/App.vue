<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router';
</script>

<template>
  <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">Menu</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
          <li class="nav-item">
            <RouterLink to="/formulario" class="nav-link active" aria-current="page">Formulario de inicio</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/listado" class="nav-link">Listado de personas</RouterLink>
          </li>
          <li class="nav-item">
            <form class="d-flex" role="search">
              <input class="form-control me-2" type="search" placeholder="Nombre a Buscar" aria-label="Search">
              <button class="btn btn-light">Buscar</button>
            </form>

          </li>
        </ul>
      </div>
    </div>
  </nav>

  <RouterView />
</template>
