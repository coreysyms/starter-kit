<template>
    <sectionDefault v-if="typename === 'section'" :fields="fields" />
    <!-- add more component sections here of different types if it's so needed -->
</template>

<script>

export default {
    name: 'BaseSection',
    props: ['typename','fields'],
    components: {
       'sectionDefault': () => import(/* webpackChunkName: "sectionDefault" */ '@/components/sectionDefault')
       /* make sure you add the component here as well */
    }
}
</script>