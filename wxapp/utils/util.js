const validators = {
  required: {
    rule: /.+/,
    msg: '请填写必填内容'
  },
  phone: {
    rule: /(?:\d{3}|\(\d{3}\))([-\/\.])\d{3}\1\d{4}/,
    msg: '请按照012-345-6789格式填写'
  },
  name: {
    rule: /^[-'a-z\s\u4e00-\u9eff]{1,20}$/i,
    msg: '请输入中，英文名字'
  },
  email: {
    rule: /^[A-Za-z0-9-]+@purdue.edu$/,
    msg: '请输入普渡邮箱'
  },
  id: {
    rule: /^[0-9]{4}$/,
    msg: '请输入正确的门票编号'
  }
  
};

let validate = (e, context) => {
  console.log(e);
  let validator = e.currentTarget.dataset.validator ? e.currentTarget.dataset.validator.split(' ') : [e.currentTarget.dataset.validator];
  let value = (e.detail.value || '').trim();
  // console.log(value);
  let name = e.currentTarget.dataset.name;
  // console.log(name);
  let form = context.data.form || {};
  for (let i = 0; i < validator.length; i++) {
    let rule = validators[validator[i]].rule;
    if (!rule.test(value)) {
      form[name] = '';
      form.$invalidMsg = validators[validator[i]].msg;
      form.$dirty = true;
      context.setData({
        form: form
      })
      break;
    }
    else {
      form[name] = value;
      form.$dirty = false;
      form.$invalidMsg = '';
      context.setData({
        form: form
      })
    }
  }
  // console.log(validator);
  // console.log(value);
}
let validateRequired = (props, context) => {
  // console.log(context);
  let form = context.data.form || {};
  props.forEach((prop) => {
    if (!validators.required.rule.test(context.data.form[prop])) {
      form[prop] = validators.required.msg;
    }
    else {
      form[prop] = context.data.form[prop];
    }
  })
}
module.exports = { validate, validateRequired }