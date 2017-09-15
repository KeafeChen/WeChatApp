const validators = {
  required: {
    rule: /.+/,
    msg: '请填写内容'
  },
  phone: {
    rule: /(?:\d{3}|\(\d{3}\))([-\/\.])\d{3}\1\d{4}/,
    msg: '请按照012-345-6789格式填写'
  }
  // name: {
  //   rule: , 
  //   msg: '请输入中，英文名字'
  // }
};

let validate = (e, context) => {
  // console.log(context);
  let validator = e.currentTarget.dataset.validator ? e.currentTarget.dataset.validator.split(' ') : [e.currentTarget.dataset.validator];
  let value = (e.detail.value || '').trim();
  let name = e.currentTarget.dataset.name;
  let form = context.data.form || {};
  for (let i = 0; i < validator.length; i++) {
    let rule = validators[validator[i]].rule;
    if(!rule.test(value)) {
      form[name] = '';
    }
    else {
      form[name] = value;
    }
    context.setData({
      form: form
    })
  }
  // console.log(validator);
  // console.log(value);
}
let validateRequired = (props, context) => {
  // console.log(context);
  let form = context.data.form || {};
  props.forEach((prop) => {
    if(!validators.required.rule.test(context.data[prop])) {
      form[prop] = '';
    }
    else {
      form[prop] = validators[prop].msg;
    }
  })
}
module.exports = {validate, validateRequired}