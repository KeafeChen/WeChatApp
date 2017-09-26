import { validate, validateRequired } from '../../utils/util';
// console.log(common);
Page({
  data: {
    pickerHidden: true,
    modalHidden: true,
    name: '姓名',
    genders: [
      { 'name': "男", 'value': '男', 'checked': true },
      { 'name': '女', 'value': '女', 'checked': false }
    ],
    email: 'pucssa@purdue.edu',
    phone: '012-345-6789',
    song: '请填写参赛曲目',
    form: {
      gender: '男'
    },
    id: '请输入您的门票编号'
  },
  radioChange(e) {
    this.data.form.gender = e.detail.value;
    // console.log(this);
  },
  validate(e) {
    // console.log(e);
    this.setData({
      [e.currentTarget.dataset.validator]: e.detail.value
    })
    // console.log(e.detail.value);
    validate(e, this);
    // console.log(this);
  },
  formSubmit: function (e) {
    // console.log(this);
    validateRequired(['name', 'phone', 'email', 'song'], this);
    let values = this.data.form;
    // console.log(values);
    let context = this;
    if(!this.data.form.$dirty) {
      wx.request({
        url: 'https://pucssa.org/wxSubmit.php',
        method: 'post',
        data: values,
        header: {
          'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
          console.log(res);
          if (res.data == '') {
            values.$dirty = false;
            values.$invalidMsg = '';
            wx.navigateTo({
              url: '../vote/vote'
            })
          }
          else {
            values.$invalidMsg = res.data;
            values.$dirty = true;
            context.setData({
              form: values
            })
          }
        }
      })
    }
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
  }
})