<template>
  <div>
    <nav class="navbar navbar-expand-lg">
      <div class="container-fluid ms-5">
        <div class="collapse navbar-collapse justify-content-center" id="navbarNav">
          <ul class="navbar-nav gap-5">
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

<style lang="scss" scoped>
.navbar {
  background-color: var(--header-background);
  box-shadow: 0 4px 4px -2px var(--header-shadow);
}

.nav-link {
  font-size: 20px;
  font-weight: 400;
  color: var(--header-text);

  &:hover {
    color: var(--header-active-text);
  }

  &.active {
    color: var(--header-active-text) !important;
  }
}
</style>
