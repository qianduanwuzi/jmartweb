<template>
    <div>
        <ul>
            <li v-for="(item,index) in 5 " :key="index" @click="star_change(item)">
                <i :class="`fa fa-star ${item<=star?'active':''}`"></i>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
  props: {
    star: {
      type: Number,
      default: 4
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    star_change(item) {
      if (!this.disabled) this.$emit("starchange", item);
    }
  }
};
</script>

<style lang="scss" scoped>
.fa {
  color: #e1e1e1;
  font-size: 18px;
}
.active {
  color: #fc982c;
}
li {
  cursor: pointer;
  list-style: none;
  float: left;
}
</style>
