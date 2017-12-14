<template>
	<div class="nofile">
        <slot name="bgimg"></slot>
        <p class="F4 C5 nop"><slot name="info"></slot></p>
    </div>
</template>
<script>
export default {
  name: 'nofile'
}
</script>
<style lang="less" scoped>
.nofile{
  	position: absolute;
  	left: 50%;
  	margin: 2.66666rem 0 0 -1.72666rem;
  	text-align: center;
	  	img{
	  	width: 3.44rem;
	  	height: 3.44rem;
	}
	p{
		display:block;width: 3.44rem;color: #A8A8A8;
	}
	
}
.nop{
	margin-top: 0.74666rem;
}
</style>
