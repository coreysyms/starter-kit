<template>
    <header>
      <div class="row">
        <BaseRichText v-if="fields.body" classes="richtext" :content="fields.body"></BaseRichText>
      </div>
    </header>
</template>

<script>


export default {
  name:'BaseHeader',
  props: ['fields']
}

</script>