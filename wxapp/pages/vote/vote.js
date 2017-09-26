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
    console.log(this);
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
    let context = this;
    console.log(values);
    this.setData(
      {
        // modalHidden: false,
        name: values.name,
        gender: values.gender,
        year: values.year,
        email: values.email,
        phone: values.phone,
        song: values.song
      }
    )
    if(!this.data.form.$dirty) {
      wx.request({
        url: 'https://pucssa.org/validate.php',
        method: 'post',
        data: values,
        header: {
          'content-type': 'application/json'
        },
        success: function (res) {
          console.log('sent');
          context.setData({
            modalHidden: false
          })
        }
      })
    }
    // console.log('form发生了submit事件，携带数据为：', e.detail.value)
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