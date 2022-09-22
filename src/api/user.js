// 用户请求相关
import request from "@/utils/request";
// import store from '@/store'

// 用户请求封装
export const login = (data) => {
  return request({
    method: "post",
    url: "/v1_0/authorizations",
    data,
  });
};

// 获取短信验证码
export const getSmsCode = (mobile) => {
  return request({
    method: "GET",
    url: `/app/v1_0/sms/codes/${mobile}`,
  });
};

// 获取用户自己的信息
export const getUserInfo = () => {
  return request({
    method: "get",
    url: "/v1_0/user",
    // 发起请求头数据
    // headers: {
    //   Authorization: `Bearer ${store.state.user.token}`
    // }
  });
};

// 获取用户频道列表
export const setUserInfo = () => {
  return request({
    method: "get",
    url: "/v1_0/user/channels",
  });
};

// 获取文章列表数据
export const setarticle = (params) => {
  return request({
    method: "get",
    url: "/v1_0/articles",
    params,
  });
};

//  所有频道

export const allpost = () => {
  return request({
    method: "get",
    url: "/v1_0/channels",
  });
};

//  搜索结果
export const loadallposts = (q) => {
  return request({
    method: "get",
    url: "/v1_0/suggestion",
    params: {
      q,
    },
  });
};

// 保存频道

export const allpostsave = (data) => {
  return request({
    method: "patch",
    url: "/v1_0/user/channels",
    data: {
      channels: [data],
    },
  });
};

// 删除频道
export const allpostdelect = (data) => {
  return request({
    method: "delete",
    url: `/v1_0/user/channels/${data}`,
  });
};

// 搜索结果

export const allpostsearch = params => {
  return request({
    method: "get",
    url: "/v1_0/search",
    params
  });
};

// 文章详情
export const articleparticulars = article_id => {
  return request({
    method: "get",
    url: `/v1_0/articles/${article_id}`,
  });
};

// 关注作者
export const attention = value => {
  return request({
    method: "post",
    url: '/v1_0/user/followings',
    data: {
      target: value
    }
  });
};

// 取消关注
export const cancel_attention = target => {
  return request({
    method: "delete",
    url: `/v1_0/user/followings/${target}`,
  });
};

// 收藏
export const collect = value => {
  return request({
    method: "post",
    url: '/v1_0/article/collections',
    data: {
      target: value
    }
  });
};

// 取消收藏
export const cancel_collect = target => {
  return request({
    method: "delete",
    url: `/v1_0/article/collections/${target}`,
  });
};


// 点赞
export const give = value => {
  return request({
    method: "post",
    url: '/v1_0/article/likings',
    data: {
      target: value
    }
  });
};

// 取消点赞
export const cancel_give = target => {
  return request({
    method: "delete",
    url: `/v1_0/article/likings/${target}`,
  });
};

// 评论列表
export const comment_list = params => {
  return request({
    method: "get",
    url: '/v1_0/comments',
    params
  });
};
// 评论点赞
export const addcomment = value => {
  return request({
    method: "post",
    url: '/v1_0/comment/likings',
    data: {
      target: value
    }
  });
};
// 评论取消点赞
export const deletecomment = target => {
  return request({
    method: "delete",
    url: `/v1_0/comment/likings/${target}`,
  });
};

// 文章评论
export const Article_Comments = data => {
  return request({
    method: "post",
    url: "/v1_0/comments",
    data
  });
};

// 获取用户个人简介
export const individual_resume = () => {
  return request({
    method: "get",
    url: "/v1_0/user/profile",
  });
};

// 更新用户信息
export const updateuser = data => {
  return request({
    method: "patch",
    url: "/v1_0/user/profile",
    data
  });
};

// 更新用户头像
export const updateuserdata = data => {
  return request({
    method: "patch",
    url: "/v1_0/user/photo",
    data
  });
};