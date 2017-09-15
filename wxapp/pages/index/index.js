import { validate, validateRequired } from '../../utils/util';
// console.log(common);
Page({
  data: {
    pickerHidden: true,
    modalHidden: true,
    name: '姓名',
    genders: [
      { 'name': "男", 'value': 'male', 'checked': true },
      { 'name': '女', 'value': 'female', 'checked': false }
    ],
    email: 'pucssa@purdue.edu',
    phone: '012-345-6789',
    song: '请填写参赛曲目',
    form: {}
  },
  validate(e) {
    console.log(e);
    this.setData({
      [e.currentTarget.dataset.validator]: e.detail.value
    })
    // console.log(e.detail.value);
    validate(e, this)
  },
  formSubmit: function (e) {
    // console.log(this);
    validateRequired(['name', 'phone', 'email', 'song'], this);
    let values = this.data.form;
    // console.log(values);
    // this.setData(
    //   {
    //     modalHidden: false,
    //     name: value.name,
    //     gender: value.gender,
    //     year: value.year,
    //     email: value.email,
    //     phone: value.phone,
    //     song: value.song
    //   }
    // )
    wx.request({
      url: 'https://pucssa.org/wxSubmit.php',
      method: 'post',
      data: values,
      header: {
        'content-type': 'application/json'
      },
      success: function (res) {
        console.log('sent');
      }
    })
    console.log('form发生了submit事件，携带数据为：', e.detail.value)
  },
  formReset: function (e) {
    console.log('form发生了reset事件，携带数据为：', e.detail.value)
    this.setData({
      chosen: ''
    })
  },
  modalChange: function (e) {
    this.setData({
      modalHidden: true
    })
  },
})