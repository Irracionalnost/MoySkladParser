<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-body-tertiary">
      <div class="container-fluid">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link class="nav-link" :class="{ active: $route.path === '/home' }" to="/home">
                Верстка статьи
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :class="{ active: $route.path === '/delete-domens' }"
                to="/delete-domens"
              >
                Удаление доменов
              </router-link>
            </li>
            <li class="nav-item">
              <router-link
                class="nav-link"
                :class="{ active: $route.path === '/documentation' }"
                to="/documentation"
              >
                Документация
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </div>
</template>
