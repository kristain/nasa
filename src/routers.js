'use strict'

export default function(router){
    router.map({
      '/buyer/':{ //首页
        name:'home',
        component: function(resolve){
          require(['./views/welcome.vue'],resolve);
        }
      },
      '/buyer/*':{ //404
        name:'home',
        component: function(resolve){
          require(['./views/error/unfound.vue'],resolve);
        }
      },
      '/buyer/index':{
        name:'index',
        component: function(resolve){
          require(['./views/index.vue'],resolve);
        }
      },
      '/buyer/login':{ //登录
        name:'login',
        component: function(resolve){
          require(['./views/account/login.vue'],resolve);
        }
      },
      '/buyer/register':{ //注册用户
        name:'register',
        component: function(resolve){
          require(['./views/account/register.vue'],resolve);
        }
      },
      '/buyer/find-password':{ //找回密码
        name:'find-password',
        component: function(resolve){
          require(['./views/account/findPassword.vue'],resolve);
        }
      },
      '/buyer/invite':{ //登录
        name:'invite',
        component: function(resolve){
          require(['./views/account/invite.vue'],resolve);
        }
      },
      '/buyer/task/index':{ //任务主页
        name:'task-index',
        component: function(resolve){
          require(['./views/task/index.vue'],resolve);
        }
      },
      '/buyer/task/center/start/:id':{ //任务大厅-开始任务
        name:'task-center-start',
        component: function(resolve){
          require(['./views/task/centerStart.vue'],resolve);
        }
      },
      '/buyer/task/center/receive/:id':{ //任务大厅-开始任务（领取任务）
        name:'task-center-receive',
        component: function(resolve){
          require(['./views/task/centerReceiveTask.vue'],resolve);
        }
      },
      '/buyer/task/center/show/:id':{ //任务大厅-任务详情（只查看）
        name:'task-center-show',
        component: function(resolve){
          require(['./views/task/centerCancelDetail.vue'],resolve);
        }
      },
      '/buyer/task/center/account':{ //任务大厅-有账号
        name:'task-center-account',
        component: function(resolve){
          require(['./views/task/centerAccount.vue'],resolve);
        }
      },
      '/buyer/task/center/no-account':{ //任务大厅-无账号
        name:'task-center-no-account',
        component: function(resolve){
          require(['./views/task/centerAccountNull.vue'],resolve);
        }
      },
      '/buyer/users/task':{ //我的任务-主页
        name:'users-task',
        component: function(resolve){
          require(['./views/users/taskIndex.vue'],resolve);
        }
      },
      '/buyer/users/task/list/:status':{ //我的任务-任务列表
        name:'users-task-list',
        component: function(resolve){
          require(['./views/users/taskList.vue'],resolve);
        }
      },
      '/buyer/users/task/cancel-list':{ //我的任务-任务列表(已取消)
        name:'users-task-cancel-list',
        component: function(resolve){
          require(['./views/users/taskCancelList.vue'],resolve);
        }
      },
      '/buyer/account/list':{ //买号列表-淘宝
        name:'account-list',
        component: function(resolve){
          require(['./views/account/list.vue'],resolve);
        }
      },
      '/buyer/account/add':{ //账号详情-添加买手账号
        name:'account-add',
        component: function(resolve){
          require(['./views/account/add.vue'],resolve);
        }
      },
      '/buyer/account/modify/:id':{ //账号详情-修改买手账号
        name:'account-modify',
        component: function(resolve){
          require(['./views/account/modify.vue'],resolve);
        }
      },
      '/buyer/users/userinfo':{ //个人中心-主页
        name:'userinfo',
        component: function(resolve){
          require(['./views/users/userinfo.vue'],resolve);
        }
      },
      '/buyer/users/profiles':{ //个人中心-个人资料
        name:'users-profiles',
        component: function(resolve){
          require(['./views/users/profiles.vue'],resolve);
        }
      },
      '/buyer/users/getCashedHome':{ //个人中心-提现主页
        name:'users-cashed-home',
        component: function(resolve){
          require(['./views/users/getCashedHome.vue'],resolve);
        }
      },
      '/buyer/users/getCashed/':{ //个人中心-提现
        name:'users-cashed',
        component: function(resolve){
          require(['./views/users/getCashed.vue'],resolve);
        }
      },
      '/buyer/users/capitalFlow':{ //个人中心-资金流水
        name:'users-capital-flow',
        component: function(resolve){
          require(['./views/users/capitalFlow.vue'],resolve);
        }
      },
      '/buyer/users/myinvite':{ //推广页面
        name:'users-myinvite',
        component: function(resolve){
          require(['./views/users/myinvite.vue'],resolve);
        }
      },
      '/buyer/users/myinvite/detail':{ //邀请明细
        name:'users-myinvite-detail',
        component: function(resolve){
          require(['./views/users/inviteDetail.vue'],resolve);
        }
      },
      '/buyer/message/list/:type':{ //消息中心
        name:'message-list',
        component: function(resolve){
          require(['./views/message/list.vue'],resolve);
        }
      },
      '/buyer/message/detail/:messageId':{ //消息中心 - 消息详情
        name:'message-detail',
        component: function(resolve){
          require(['./views/message/detail.vue'],resolve);
        }
      }

    })
}
