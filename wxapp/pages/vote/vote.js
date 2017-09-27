import { validate, validateRequired } from '../../utils/util';
// console.log(common);
Page({
  data: {
    pickerHidden: true,
    modalHidden: true,
    group1_male: '1',
    array_first: [
      { name: '1', value: '张灿', checked: 'ture' },
      { name: '2', value: '林浩哲' },
    ],
    group2_male: '3',
    array_second: [
      { name: '3', value: '杨超', checked: 'ture' },
      { name: '4', value: '岳子昂' },
    ],
    group3_male: '5',
    array_third: [
      { name: '5', value: 'Jacob', checked: 'ture' },
      { name: '6', value: 'Chris' },
    ],
    group1_female: '7',
    array_fourth: [
      { name: '7', value: '雷雨欣', checked: 'ture' },
      { name: '8', value: '苏帧欢' },
    ],
    group2_female: '9',
    array_fifth: [
      { name: '9', value: '肖晓', checked: 'ture' },
      { name: '10', value: '张翔宇' },
    ],
    group3_female: '11',
    array_sixth: [
      { name: '11', value: '赵艺柯', checked: 'ture' },
      { name: '12', value: '赵艺晴' },
    ],
    form:{
      group1_male:'1'
    }
  },
  first: function (e) {
    this.data.form.group1_male = e.detail.value;
    console.log(e);
  },
  second: function (e) {
    this.data.form.group2_male = e.detail.value;
    console.log(e);
  },
  third: function (e) {
    this.data.form.group3_male = e.detail.value;
    console.log(e);
  },
  fourth: function (e) {
    this.data.form.group1_female = e.detail.value;
    console.log(e);
  },
  fifth: function (e) {
    this.data.form.group2_female = e.detail.value;
    console.log(e);
  },
  sixth: function (e) {
    this.data.form.group3_female = e.detail.value;
    console.log(e);
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
  onLoad:function(options){
    console.log(options);
  },
  formSubmit: function (e) {
    // console.log(this);
    validateRequired(['group1_male', 'group2_male', 'group3_male', 'group1_female', 'group2_female', 'group3_female'], this);
    let values = this.data.form;
    let context = this;
    console.log(values);
    this.setData(
      {
        // modalHidden: false,
        group1_male: values.group1_male,
        group2_male: values.group2_male,
        group3_male: values.group3_male,
        group1_female: values.group1_female,
        group2_female: values.group2_female,
        group2_female: values.group3_female
      }
    )
    if (!this.data.form.$dirty) {
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