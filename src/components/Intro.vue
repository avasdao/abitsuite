<template>
    <div class="mt-12 mx-auto max-w-7xl px-5 sm:mt-24 sm:px-6">
        <div class="">

            <h1 class="text-4xl text-center tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                <span class="block">Mint. Mine. Send.</span>
                <span class="block">Drop &amp; Burn</span>
                <span class="block text-5xl sm:text-7xl text-indigo-600">Your Tokens</span>
            </h1>

            <p class="mt-3 max-w-md mx-auto text-base text-gray-500 sm:text-lg md:mt-5 md:text-xl md:max-w-3xl">
                ABS supports your team's Token or DAO with the <span class="font-bold">MOST</span> comprehensive suite of <span class="font-bold text-indigo-500">Crypto Tools &amp; Services</span>, including:
            </p>

        </div>

        <div class="mx-5 mt-3 space-y-2 text-center">
            <span class="block font-medium"><span class="mr-1">✔</span> Instant DAO Creator</span>
            <span class="block font-medium"><span class="mr-1">✔</span> Voting &amp; Governance</span>
            <span class="block font-medium"><span class="mr-1">✔</span> Automated Payouts &amp; Rewards</span>
            <span class="block font-medium"><span class="mr-1">✔</span> PoW Token Mining <span class="text-red-500 font-bold">NEW!</span></span>
            <span class="block font-medium"><span class="mr-1">✔</span> Token Bridge (BYOB) <span class="text-red-500 font-bold">NEW!</span></span>
            <span class="block font-medium ml-6">and BUIDLing much more...</span>
        </div>
    </div>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

export default {
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

<style scoped>
/*  */
</style>
