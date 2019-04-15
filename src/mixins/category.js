import { mapGetters } from 'vuex'; 
import Store from "storejs";
var category = {
    props:{
        
    },
    data() {
        return {
            showLvTwo: false, // 二级菜单显示
            list: [{ name: "", url: "", icon: "" }],
            // showLoding: false, // 控制loding
            curName: "", // 当前悬浮分类名
            second_child_list: [], // 二级分类(后期可能还有三级分类)
            curCateName: '', //当前显示的分类
        }
    },
    computed: {
        ...mapGetters({
          categories: "getCategories"
        }),
        // 哪个层级分类进来的就显示哪个分类名
        // curCateName() {
        //   let name = ''; 
        //   this.categories.map(one => {
        //     if(one.id == this.$route.params.id) name = one.name
        //      one.sub_list.map(sone => {
        //       if(sone.id == this.$route.params.id) name = sone.name
        //      })
        //   })
        //   Store.set('curCateName', name)
        //   Store.set('curCateId', this.$route.params.id)
        //   return name
        // }
      },
    created: function () {
        
    },
    mounted() {
      // this.getCurCateName()
    },
    methods: {
        // 哪个层级分类进来的就显示哪个分类名
      // getCurCateName() {
      //   let name = ''; 
      //   this.categories.map(one => {
      //     if(one.id == this.$route.params.id) name = one.name
      //      one.sub_list.map(sone => {
      //       if(sone.id == this.$route.params.id) name = sone.name
      //      })
      //   })
      //   console.log(this.categories, this.$route.params.id)
      //   Store.set('curCateName', name)
      //   Store.set('curCateId', this.$route.params.id)
      //   this.curCateName = name
      // },
       // 悬停filter子分类
    mouseEnterHandler(d) {
        this.curName = d.name;
          this.$nextTick(() => {
            if (this.curName == d.name) {
              // this.showLoding = true;
               
                this.second_child_list = this.categories.find(item => item.name == d.name).sub_list
                if(this.second_child_list.length)    this.showLvTwo = true
                else this.showLvTwo = false
                // this.showLoding = false;
            }
          });
      },
      // before:一级分类click（没有子类方能跳转路由）, after: 不管有没有子类，直接跳转
      clickFirstHandler(row) {
          this.showLvTwo = false
          this.curName = '';
          // this.showLoding = true;
          // api.get("/api/categories", { parent_id: row.id }).then(res => {
              // this.second_child_list = res.data;
              // this.showLoding = false;
              // if(res.data.length = 0)  this.$router.push({path: '/product-category/'+ row.id})
          this.$router.push({path: '/product-category/'+ row.id})
          // });
      },
      mouseLeaveHandler() {
        this.second_child_list = [];
        this.curName = '';
      }
    }
}

export default category