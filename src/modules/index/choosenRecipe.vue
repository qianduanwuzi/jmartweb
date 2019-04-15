<template>
    <div class="choosen_recipe_box">
        <h4 class="title_tip">精选专题</h4>
        <div class="fu_title_tip">MENU</div>
        <div class="menu_list_box row justify-content-between">
            <div class="col-sm-4 each_menu_box" v-for="one in list" :key="one.id">
                <div class="hover_sty" style="">
                    <div class="img_box" @click="$router.push(`/recipe/${one.id}`)">
                        <img :src="one.cover" :alt="one.title">
                        <!--<img src="../../assets/logo.png" :alt="one.title">-->
                    </div>
                    <div class="title">{{one.title}}</div>
                    <div class="author">
                        <label for="">作者 {{one.author}}</label>
                    </div>
                    <div class="content">“{{one.brief}}”</div>
                    <router-link :to="`/recipe/${one.id}`" class="theme_font_color gotosee">去看看<span class="right_arrow">>></span></router-link>
                </div>
            </div>
            <router-link to="/recipe" class="theme_font_color gotosee seemore">查看更多专题<span class="right_arrow">>></span></router-link>
        </div>

    </div>
</template>

<script>
export default {
    data() {
        return {
            list: [],
        }
    },
    mounted() {
        this.getList();
    },
    methods: {
        getList() {
            api.get('/api/posts', {page:1, size: 3}).then(res => {
                this.list = res.data.docs;
            })
        }
    }
}
</script>

<style lang="scss" scoped>
    @import "@/scss/com.scss";
    .choosen_recipe_box {
        @include view_layout;
        .menu_list_box {
            .each_menu_box {
                text-align: center;
                .img_box {
                    width: 100%;
                    height: 220px;
                    overflow: hidden;
                    cursor: pointer;
                    img {
                        width: 100%;
                        transition: all .25s;
                    }
                }
                .img_box:hover img {
                    transform: scale(1.25, 1.25)
                }
                .title {
                    font-size: 20px;
                    font-weight: 600;
                    margin-bottom: 0;
                }
                .author {
                    @include set_font(12px, #fff, 400);
                    opacity: .5;
                    label {
                        font-size: 12px;
                    }
                }
                .content {
                    font-size: 14px;
                    height: 70px;
                    overflow: hidden;
                    padding: 0 30px;
                }
            }
            .each_menu_box .hover_sty {
                border: 1px solid #f4f4f4;
                padding: 20px 0;
            }
            .each_menu_box:hover .hover_sty {
                box-shadow: 0 0 10px rgba(0, 0, 0, .15);
            }
        }
        .theme_font_color {
            font-size: 16px;
            font-weight: 600;
        }
        .gotosee .right_arrow {
            display: inline-block;
            transition: all .25s;
        }
        .gotosee:hover .right_arrow {
            transform: translateX(20px)
        }
        .seemore {
            text-align: center;
            margin: 20px auto;
        }
    }
</style>
