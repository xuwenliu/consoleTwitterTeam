<template>
  	<div class="content">
    	<title>结佣凭证</title>
		<div class="commissionVoucher">
			<img :src="credential"/>
		</div>
  	</div>
</template>
<script>
  /*mint-ui*/
import {MessageBox} from 'mint-ui';
import {Indicator} from 'mint-ui';
import {Toast} from 'mint-ui';
export default{
    name: 'commissionVoucher',
    components: {
    	
    },
    data(){
      	return {
       		credential:"",

      	}
    },
    created(){
		Indicator.open();
		var img_url = this.$route.query.credential;
		var img = new Image();
		img.src = img_url;
		img.onload = ()=>{
			this.credential=img_url
			Indicator.close();
		}	
    },
    mounted(){

    },
    methods: {
     
    },

}

</script>

<style scoped lang="less">
.commissionVoucher{
	img{
		width: 100%;
		display: block;
	}
}
</style>
