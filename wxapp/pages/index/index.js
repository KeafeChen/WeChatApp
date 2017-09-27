import { validate, validateRequired } from '../../utils/util';
// console.log(common);
Page({
  data: {
    pickerHidden: true,
    modalHidden: true,
    id: '请输入您的门票编号',
    
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
    validateRequired(['id'], this);
    let values = this.data.form;
    let context = this;
    console.log(values);
    this.setData(
      {
        // modalHidden: false,
        id: values.id,
      }
    )
    if (!this.data.form.$dirty) {
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
              url: '../vote/vote?id=' + values.id
            })
          }
          else{
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