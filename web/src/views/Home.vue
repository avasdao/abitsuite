<template>
    <!-- This example requires Tailwind CSS v2.0+ -->
    <main class="bg-gray-50">
        <div class="relative overflow-hidden">
            <div class="absolute inset-y-0 h-full w-full" aria-hidden="true">
                <div class="relative h-full">
                    <svg class="absolute right-full transform translate-y-1/3 translate-x-1/4 md:translate-y-1/2 sm:translate-x-1/2 lg:translate-x-full" width="404" height="784" fill="none" viewBox="0 0 404 784">
                        <defs>
                            <pattern id="e229dbec-10e9-49ee-8ec3-0286ca089edf" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect width="404" height="784" fill="url(#e229dbec-10e9-49ee-8ec3-0286ca089edf)" />
                    </svg>
                    <svg class="absolute left-full transform -translate-y-3/4 -translate-x-1/4 sm:-translate-x-1/2 md:-translate-y-1/2 lg:-translate-x-3/4" width="404" height="784" fill="none" viewBox="0 0 404 784">
                        <defs>
                            <pattern id="d2a68204-c383-44b1-b99f-42ccff4e5365" x="0" y="0" width="20" height="20" patternUnits="userSpaceOnUse">
                                <rect x="0" y="0" width="4" height="4" class="text-gray-200" fill="currentColor" />
                            </pattern>
                        </defs>
                        <rect width="404" height="784" fill="url(#d2a68204-c383-44b1-b99f-42ccff4e5365)" />
                    </svg>
                </div>
            </div>

            <div class="relative pt-6 pb-16 sm:pb-24">
                <div>
                    <div class="max-w-7xl mx-auto px-4 sm:px-6">
                        <nav class="relative flex items-center justify-between sm:h-10 md:justify-center" aria-label="Global">
                            <div class="flex items-center flex-1 md:absolute md:inset-y-0 md:left-0">
                                <div class="flex items-center justify-between w-full md:w-auto">
                                    <a href="javascript://">
                                        <span class="sr-only">aBitSuite</span>
                                        <img class="h-12 w-auto sm:h-16" :src="require('../assets/logo.png')" alt="" />
                                    </a>
                                    <div class="-mr-2 flex items-center md:hidden">
                                        <button
                                            @click="showMobileMenu = !showMobileMenu"
                                            type="button"
                                            class="bg-gray-50 rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                            aria-expanded="false"
                                        >
                                            <span class="sr-only">Open main menu</span>
                                            <!-- Heroicon name: outline/menu -->
                                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            </div>

                            <div class="hidden md:flex md:space-x-10">
                                <a href="javascript://" class="font-medium text-gray-500 hover:text-gray-900">Product</a>

                                <a href="javascript://" class="font-medium text-gray-500 hover:text-gray-900">Features</a>

                                <a href="javascript://" class="font-medium text-gray-500 hover:text-gray-900">Marketplace</a>

                                <a href="javascript://" class="font-medium text-gray-500 hover:text-gray-900">Company</a>
                            </div>

                            <div class="hidden md:absolute md:flex md:items-center md:justify-end md:inset-y-0 md:right-0">
                                <span class="inline-flex rounded-md shadow">
                                    <router-link to="/portal" class="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md text-indigo-600 bg-white hover:text-indigo-500">
                                        Portal Demo
                                    </router-link>
                                </span>
                            </div>
                        </nav>
                    </div>

                    <!--
              Mobile menu, show/hide based on menu open state.

              Entering: "duration-150 ease-out"
                From: "opacity-0 scale-95"
                To: "opacity-100 scale-100"
              Leaving: "duration-100 ease-in"
                From: "opacity-100 scale-100"
                To: "opacity-0 scale-95"
            -->
                    <div v-if="showMobileMenu" class="absolute z-10 top-0 inset-x-0 p-2 transition transform origin-top-right md:hidden">
                        <div class="rounded-lg shadow-md bg-white ring-1 ring-black ring-opacity-5 overflow-hidden">
                            <div class="px-5 pt-4 flex items-center justify-between">
                                <div>
                                    <img class="h-12 w-auto" :src="require('../assets/logo.png')" alt="aBitSuite" />
                                </div>

                                <div class="-mr-2">
                                    <button
                                        @click="showMobileMenu = !showMobileMenu"
                                        type="button"
                                        class="bg-white rounded-md p-2 inline-flex items-center justify-center text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500"
                                    >
                                        <span class="sr-only">Close main menu</span>
                                        <!-- Heroicon name: outline/x -->
                                        <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                                        </svg>
                                    </button>
                                </div>
                            </div>

                            <div class="px-2 pt-2 pb-3 space-y-1">
                                <a href="javascript://" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Product</a>

                                <a href="javascript://" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Features</a>

                                <a href="javascript://" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Marketplace</a>

                                <a href="javascript://" class="block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-50">Company</a>
                            </div>

                            <a href="javascript://" class="block w-full px-5 py-3 text-center font-medium text-indigo-600 bg-gray-50 hover:bg-gray-100 hover:text-indigo-700">
                                Log in
                            </a>
                        </div>
                    </div>
                </div>

                <Intro />
            </div>

            <div class="relative">
                <div class="absolute inset-0 flex flex-col" aria-hidden="true">
                    <div class="flex-1"></div>
                    <div class="flex-1 w-full bg-gray-800"></div>
                </div>
                <div class="max-w-7xl mx-auto px-4 sm:px-6">
                    <img class="relative rounded-lg shadow-lg" src="https://tailwindui.com/img/component-images/top-nav-with-multi-column-layout-screenshot.jpg" alt="App screenshot" />
                </div>
            </div>
        </div>
        <div class="bg-gray-800">
            <div class="max-w-7xl mx-auto py-16 px-4 sm:py-24 sm:px-6 lg:px-8">
                <h2 class="text-center text-gray-400 text-sm font-semibold uppercase tracking-wide">Trusted by over 26,000 forward-thinking companies</h2>
                <div class="mt-8 grid grid-cols-2 gap-8 md:grid-cols-6 lg:grid-cols-5">
                    <div class="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                        <img class="h-12" src="https://tailwindui.com/img/logos/tuple-logo-gray-400.svg" alt="Tuple" />
                    </div>
                    <div class="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                        <img class="h-12" src="https://tailwindui.com/img/logos/mirage-logo-gray-400.svg" alt="Mirage" />
                    </div>
                    <div class="col-span-1 flex justify-center md:col-span-2 lg:col-span-1">
                        <img class="h-12" src="https://tailwindui.com/img/logos/statickit-logo-gray-400.svg" alt="StaticKit" />
                    </div>
                    <div class="col-span-1 flex justify-center md:col-span-3 lg:col-span-1">
                        <img class="h-12" src="https://tailwindui.com/img/logos/transistor-logo-gray-400.svg" alt="Transistor" />
                    </div>
                    <div class="col-span-2 flex justify-center md:col-span-3 lg:col-span-1">
                        <img class="h-12" src="https://tailwindui.com/img/logos/workcation-logo-gray-400.svg" alt="Workcation" />
                    </div>
                </div>
            </div>
        </div>

        <Footer />
    </main>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import components. */
import Footer from '@/components/Footer.vue'
import Intro from '@/components/Intro'

export default {
    components: {
        Footer,
        Intro,
    },
    data: () => ({
        showMobileMenu: null,
    }),
    computed: {
        ...mapGetters('profile', [
            // 'getSessions',
        ]),
    },
    methods: {
        ...mapActions('profile', [
            // 'addSession',
        ]),

    },
    created: function () {
        this.showMobileMenu = false
    },
    mounted: function () {
        //
    },
}
</script>
