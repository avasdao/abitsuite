<template>
    <main>
        <h1>Blank</h1>

        <Footer />
    </main>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import components. */
import Footer from '@/components/Footer.vue'

export default {
    components: {
        Footer,
    },
    data: () => ({
        //
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
        //
    },
    mounted: function () {
        //
    },
}
</script>
