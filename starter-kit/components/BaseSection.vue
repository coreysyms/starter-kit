<template>
    <sectionDefault v-if="typename === 'section'" :fields="fields" />
</template>

<script>

export default {
    name: 'BaseSection',
    props: ['typename','fields'],
    components: {
       'sectionDefault': () => import(/* webpackChunkName: "sectionDefault" */ '@/components/sectionDefault')
    }
}
</script>