<template>
    <section :class="fields.classes">
      <div class="row">
        <h6 v-if="fields.eyebrowHeading" class="eyebrow">{{ fields.eyebrowHeading }}</h6>
        <BaseRichText v-if="fields.body" classes="richtext" :content="fields.body"></BaseRichText>
      </div>
    </section>
</template>

<script>
export default {
    name: 'sectionDefault',
    props: ['fields']
}
</script>