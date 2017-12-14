import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router);

export default new Router({
	  //mode:'history',
  	routes: [
  	{path: '/', redirect: {name: 'login'}},
		/*登录*/
    {path: '/login', name: 'login', component: (resolve => require(['../pages/user/login'], resolve))},
    /*找回密码*/
    {path: '/findPwd', name: 'findPwd', component: (resolve => require(['../pages/user/findPwd'], resolve))},
    /*修改密码*/
   	{path: '/changePwd', name: 'changePwd', component: (resolve => require(['../pages/user/changePwd'], resolve))},
    /*规则说明*/
    {path: '/ruleDesc', name: 'ruleDesc', component: (resolve => require(['../pages/twitterTeam/ruleDesc'], resolve))},
		
		{path: '/twitterTeam', name: 'twitterTeam', component: (resolve => require(['../pages/twitterTeam/twitterTeam'], resolve)),
			children:[
				{path: 'earnings', name: 'earnings', component: (resolve => require(['../pages/twitterTeam/earnings'], resolve))},
				{path: 'team', name: 'team', component: (resolve => require(['../pages/twitterTeam/team'], resolve))},
			]
		},
		/*佣金明细*/
    {path: '/commissionDetails', name: 'commissionDetails', component: (resolve => require(['../pages/twitterTeam/commissionDetails'], resolve))},
  	/*结佣记录*/
  	{path: '/commissionRecord', name: 'commissionRecord', component: (resolve => require(['../pages/twitterTeam/commissionRecord'], resolve))},
  	/*结佣凭证*/
  	{path: '/commissionVoucher', name: 'commissionVoucher', component: (resolve => require(['../pages/twitterTeam/commissionVoucher'], resolve))},
  	/*添加新成员*/
  	{path: '/addMember', name: 'addMember', component: (resolve => require(['../pages/twitterTeam/addMember'], resolve))},
  	
  	
  	]
})
