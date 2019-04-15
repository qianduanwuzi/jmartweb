<template>
        <div style="width: 800px">
            <div v-show="isBind" >
                <div v-for="(one,index) in cardInfo" :key="index" :style="{'margin-top': index? '30px':'0', position: 'relative', 'margin-left': index % 2? '20px' :'0', display: 'inline-block'}"> 
                    <input type="radio"  :value="one.is_default" :checked="one.is_default" style="appearance: radio;position: absolute;top:65px" @click="setDefault(one.id)">
                    <div class="card_info">
                        <div class="card_in_info">
                            <div style="display: flex;justify-content: space-between">
                                <div class="square"></div>
                                <div class="brand">{{one.account.brand}}</div>
                            </div>
                            <div class="ex_date">{{one.account.exp_month}} / {{one.account.exp_year}}</div>
                            <div class="card_no">**** **** **** {{one.account.last4}}</div>
                        </div>
                        <!--<div :class="[curMouseI == index? 'up' : '']" v-if="curMouseI == index">-->
                            <i class="fa fa-trash-o trash" @click="unbindCard(one.id)"></i>
                        <!--</div>-->
                    </div>
                     <!--<div class="card_info" @mouseover="curMouseI = index"  @mouseout="curMouseI = -1">
                        <div class="card_in_info">
                            <div style="display: flex;justify-content: space-between">
                                <div class="square"></div>
                                <div class="brand">{{one.account.brand}}</div>
                            </div>
                            <div class="ex_date">{{one.account.exp_month}} / {{one.account.exp_year}}</div>
                            <div class="card_no">**** **** **** {{one.account.last4}}</div>
                        </div>
                        <div :class="[curMouseI == index? 'up' : '']" v-if="curMouseI == index">
                            <i class="fa fa-trash-o trash" @click="unbindCard(one.id)"></i>
                        </div>
                    </div>-->
                    
                    <!--<button class="bind_btn theme_bg_color" style="border-radius: 3px;margin-top: -42px;margin-left: 320px"  @click="unbindCard(one.id)">解绑</button>-->
                </div>  
            </div>
            <form action="/charge" method="post" id="payment-form" v-show="showAdd" :style="{'margin-top': cardInfo.length? '30px' : '0'}">
                <div class="form-row">
                    <div id="card-element">
                    </div>
                    <div id="card-errors" role="alert"></div>
                </div>
                <button class="bind_btn theme_bg_color" style="border-radius: 3px;">绑定</button>
            </form>
        <button class="theme_bg_color" :style="{'color': '#fff', 'border-radius': '5px' ,'margin-top': cardInfo.length || showAdd? '30px' : '0', 'margin-left':showAdd? '-560px' : '25px'}" @click="showAdd = true"><i class="fa fa-plus" style="margin-right: 5px"></i>添加信用卡</button>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                isBind: false,
                showAdd: false,
                cardInfo: [],
                prePath: '',
                curMouseI: -1,
            }
        },
        mounted() {
            this.getCard();
            this.$nextTick(() => {
                this.setDom();
            })
        },
        methods: {
            setDom() {
                const _this = this;
                var stripe = Stripe('pk_test_p6wDtMGsXB2tjU2WiV4NCCvy');
                var elements = stripe.elements();
                var style = {
                base: {
                    color: '#32325d',
                    lineHeight: '18px',
                    fontFamily: '"Helvetica Neue", Helvetica, sans-serif',
                    fontSmoothing: 'antialiased',
                    fontSize: '16px',
                    '::placeholder': {
                    color: '#aab7c4'
                    }
                },
                invalid: {
                    color: '#fa755a',
                    iconColor: '#fa755a'
                }
                };
                var card = elements.create('card', {style: style});
                // console.log('230', card)
                card.mount('#card-element');

                card.addEventListener('change', function(event) {
                    var displayError = document.getElementById('card-errors');
                    if (event.error) {
                    displayError.textContent = event.error.message;
                    } else {
                    displayError.textContent = '';
                    }
                });

                 var form = document.getElementById('payment-form');
                    form.addEventListener('submit', function(event) {
                        event.preventDefault();
                        stripe.createToken(card).then(function(result) {
                            if (result.error) {
                                var errorElement = document.getElementById('card-errors');
                                errorElement.textContent = result.error.message;
                            } else {
                                _this.$store.dispatch('showLoding', true)
                                // console.log(result.token.id)
                                api.post("/api/bind-card?tokenId="+result.token.id)
                                .then(res => {
                                    if(res){
                                        _this.$store.dispatch('showLoding', false)
                                        _this.$store.dispatch('setTip', { type: 'success', msg: '绑定成功!'})
                                         if(_this.prePath) this.$router.push({ path: _this.prePath});
                                        _this.getCard()
                                        _this.isBind = true
                                        _this.showAdd = false
                                    }
                                })
                            }
                        });
                    });
            },
            // 获取已绑定卡信息
               getCard() {
                      this.$store.dispatch('showLoding', true)
                   api.get('/api/users/my-card').then(res => {
                       if(res && res.data.length) {
                           this.isBind = true;
                           this.cardInfo = res.data
                       }else  this.cardInfo = []
                       this.$store.dispatch('showLoding', false)
                   })
               },
            //    解绑
               unbindCard(id) {
                   this.$store.dispatch('showLoding', true)
                   api.delete(`/api/users/unbind-card/${id}`).then(res => {
                       if(res) {
                           this.$store.dispatch('showLoding', false)
                            this.$store.dispatch('setTip', { type: 'success', msg: '解绑成功!'})
                            // this.isBind = false;
                            this.$nextTick(() => {
                                this.setDom();
                                this.getCard();
                            })
                       }
                   })
               },
               setDefault(id) {
                   this.$store.dispatch('showLoding', true)
                    api.post(`/api/users/my-card/default?id=${id}`).then(res => {
                       if(res) {
                           this.$store.dispatch('showLoding', false)
                            this.$store.dispatch('setTip', { type: 'success', msg: '默认支付设置成功!'})
                            if(this.prePath) this.$router.push({ path: this.prePath});
                            this.getCard()
                       }
                   })
               }
        },
        beforeRouteEnter (to, from, next) {
            next(vm => {
                if(from.fullPath == '/checkout') {
                    vm.prePath = from.fullPath
                }else vm.prePath = ''
            });
        },
    }
</script>

<style lang="scss" scoped>
.card_info{
    padding: 5px;
    position: relative;
    height: 150px;
    border-radius: 5px;
    color: #fff;
    width: 300px;
    border-radius: 10px;
    border: 3px solid rgb(17, 159, 60);
    margin-left: 20px;
    .trash{
        position: absolute;
        color: #119f3c;
        top: 110px;
        left: 260px;
    }
    .trash:hover{
        cursor: pointer;
        font-size: 16px;
    }
    /*.up{
        text-align: center;
        position: absolute;
        top: -3px;
        left: -3px;
        width: 300px;
        height: 150px;
        border-radius: 10px;
        border: 3px solid rgba(0,0,0,.75);
        background: rgba(0,0,0,.6);
        animation:up .25s linear;
        -webkit-animation:up .25s linear;
        .trash{
            font-size: 20px;
            margin-top: 60px;
            cursor: pointer;
        }
        .trash:hover{
            cursor: pointer;
            transform: scale(1.1, 1.1)
        }

    }*/
    @keyframes up
        {
        from {left:100%;}
        to {left: 0%;}
    }

    .card_in_info{
        border-radius: 10px;
        border: 1px solid rgb(17, 159, 60);
        height: 130px;
        padding: 10px;
        color: rgba(17, 159, 60, 0.6);
        .square{
            background: rgba(17, 159, 60, 0.6);
            height: 30px;
            width: 30px;
        }
    }
    /*background: linear-gradient(to right, rgb(17, 159, 60),#00DB00); */
    .brand{
        font-style:italic;
        font-size: 16px;
    }
    .card_no{
        color: black;
        font-weight: bold;
        /*margin-top: 10px;*/
        /*margin-left: 20px;*/
    }
    .ex_date{
         margin-top: 40px;
        /*margin-left: 10px;*/
    }
}
.StripeElement, .StripeElement--empty{
  width: 420px;
}
.order_box {
  min-height: 300px;
  .StripeElement {
    background-color: white;
    height: 40px;
    padding: 10px 12px;
    border-radius: 4px;
    border: 1px solid transparent;
    box-shadow: 0 1px 3px 0 #e6ebf1;
    -webkit-transition: box-shadow 150ms ease;
    transition: box-shadow 150ms ease;
  }

  .StripeElement--focus {
    box-shadow: 0 1px 3px 0 #cfd7df;
  }

  .StripeElement--webkit-autofill {
    background-color: #fefde5 !important;
  }
  .no_order_box {
    color: #fff;
    line-height: 40px;
    height: 40px;
    width: 950px;
    padding-left: 30px;
    a {
      color: #fff;
      font-weight: 600;
      text-decoration: underline;
      margin-right: 30px;
      margin-left: 30px;
    }
  }
}

.bind_btn{
    color: #fff;
    float: left;
    margin-top: -40px;
    margin-left: 520px;
}

.cancel{
    margin-top: -30px;
    float: right;
    margin-right: 10px;
    cursor: pointer;
    font-size: 16px;
}

.cancel:hover{
    transform: scale(1.2, 1.2);
}



#card-errors {
    height: 20px;
    padding-top: 10px;
    padding-left: 1px;
    color: #fa755a;
}

.StripeElement {
  background-color: white;
  height: 40px;
  padding: 10px 12px;
  border-radius: 4px;
  border: 1px solid transparent;
  box-shadow: 0 1px 3px 0 #e6ebf1;
  -webkit-transition: box-shadow 150ms ease;
  transition: box-shadow 150ms ease;
}

  .StripeElement--invalid {
    border-color: #fa755a;
  }


</style>