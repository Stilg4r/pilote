const inQueryOptionals = {
  in: ["query"],
  optional: true,
};

const integer = {
  ltrim: {
    options: [" "],
  },
  rtrim: {
    options: [" "],
  },
  escape: true,
  notEmpty: {
    errorMessage: "El valor es requerido.",
  },
  isInt: {
    errorMessage: "Debe ser un número entero.",
  },
  toInt: true,
};

const intParameterQueryOptional = {
  ...inQueryOptionals,
  ...integer,
};

const idSchema = {
  in: ["params"],
  ...integer,
};

const isBool = {
  isBoolean: true,
  errorMessage: "Debe ser booleano",
};

const isObject = {
  isObject: true,
  errorMessage: "Debe de ser un objeto",
};

const string = {
  ltrim: {
    options: [" "],
  },
  rtrim: {
    options: [" "],
  },
  escape: true,
  notEmpty: {
    errorMessage: "El valor es requerido.",
  },
};

const phone = {
  ...string,
  isLength: {
    options: {
      min: 10,
      max: 16,
    },
    errorMessage: "El telefono requiere una longitud entre 10 y 16 numeros",
  },
};

const email = {
  ...string,
  isEmail: {
    errorMessage: "El correo no es valido",
  },
};

const date = {
  ...string,
  isDate: {
    options: {
      format: "YYYY-MM-DD",
    },
    errorMessage: "La fecha debe tener el formato YYYY-MM-DD.",
  },
};

const allowIfempty = {
  if:{
      options: (value)=>{
          return (value==="")? false: true;
      }
  }
}

const commonsSchema = {
  date,
  string,
  integer,
  idSchema,
  inQueryOptionals,
  intParameterQueryOptional,
  isBool,
  isObject,
  email,
  phone,
  allowIfempty
};

module.exports = commonsSchema;
