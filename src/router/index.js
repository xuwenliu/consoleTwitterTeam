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


   	{path: '/twitterTeam', name: 'twitterTeam', component: (resolve => require(['../pages/twitterTeam/twitterTeam'], resolve)),
			children:[
				/*客户*/
				{path: 'customer', name: 'customer', component: (resolve => require(['../pages/twitterTeam/customer/customer'], resolve)),
					children:[
						{path: 'signCustomer', name: 'signCustomer', component: (resolve => require(['../pages/twitterTeam/customer/signList/signCustomer'], resolve))},
						{path: 'noSignCustomer', name: 'noSignCustomer', component: (resolve => require(['../pages/twitterTeam/customer/signList/noSignCustomer'], resolve))},
					]
				},
				/*收益*/
				{path: 'earnings', name: 'earnings', component: (resolve => require(['../pages/twitterTeam/earnings/earnings'], resolve))},
				/*团队*/
				{path: 'team', name: 'team', component: (resolve => require(['../pages/twitterTeam/team/team'], resolve))},
				
			]
		},
		
		
   	/*客户-未签约客户、已签约客户详情*/
		{path: '/signDetails', name: 'signDetails', component: (resolve => require(['../pages/twitterTeam/customer/signDetails/signDetails'], resolve)),
			children:[
				{path: 'fitmentTeam', name: 'fitmentTeam', component: (resolve => require(['../pages/twitterTeam/customer/signDetails//fitmentTeam'], resolve))},
				{path: 'materialSubsidy', name: 'materialSubsidy', component: (resolve => require(['../pages/twitterTeam/customer//signDetails/materialSubsidy'], resolve))},
				{path: 'signRecord', name: 'signRecord', component: (resolve => require(['../pages/twitterTeam/customer/signDetails//signRecord'], resolve))},
			]
		},
		
		
		
		
    /*收益-规则说明*/
    {path: '/ruleDesc', name: 'ruleDesc', component: (resolve => require(['../pages/twitterTeam/earnings/ruleDesc'], resolve))},
		/*收益-佣金明细*/
    {path: '/commissionDetails', name: 'commissionDetails', component: (resolve => require(['../pages/twitterTeam/earnings/commissionDetails'], resolve))},
  	/*收益-结佣记录*/
  	{path: '/commissionRecord', name: 'commissionRecord', component: (resolve => require(['../pages/twitterTeam/earnings/commissionRecord'], resolve))},
  	/*收益-结佣凭证*/
  	{path: '/commissionVoucher', name: 'commissionVoucher', component: (resolve => require(['../pages/twitterTeam/earnings/commissionVoucher'], resolve))},
	
	
	
	
		/*团队-添加新成员*/
  	{path: '/addMember', name: 'addMember', component: (resolve => require(['../pages/twitterTeam/team/addMember'], resolve))},
		
		
		
  	
  	
  	
  	]
})
