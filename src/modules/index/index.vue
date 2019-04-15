<template>
    <div class="index_box">
        <wrapper></wrapper>
        <special></special>
        <recommend></recommend>
        <choosen-recipe></choosen-recipe>
        <partenr></partenr>
    </div> 
</template>

<script>
import Wrapper from './wrapper'
import Special from './special'
import Recommend from './recommend'
import ChoosenRecipe from './choosenRecipe'
import Partenr from './partner'
export default {
    components: {Wrapper, Special, Recommend, ChoosenRecipe, Partenr},
    data() {
        return {

        }
    },
    mounted() {
         
    }
}
</script>

<style lang="scss" scoped>
.index_box{
    /*height: 1000px;*/
}
</style>

