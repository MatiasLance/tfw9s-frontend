<template>
    <div class="px-6 py-8 sm:py-12 lg:px-8">
        <!-- Breadcrumbs -->
        <div class="mb-4 flex items-center space-x-2 text-sm text-white">
            <NuxtLink to="/" class="hover:underline">
                Home
            </NuxtLink>
            <span>›</span>
            <NuxtLink to="/admin" class="hover:underline">
                Admin
            </NuxtLink>
        </div>
        <!-- Title -->
        <h1 class="text-3xl font-bold text-white sm:text-5xl">
            {{ title }}
        </h1>
    </div>
</template>

<script>
export default { props: { title: String } }
</script>
