const sqlGenerator = function (data = {}) {
  this.baseRow = data.baseRow || {};
  this.row = {};
  this.columns = [];
  this.values = [];
  this.transformers = {};

  this.filter = function (row) {
    for (const col in row) {
      if (Object.prototype.hasOwnProperty.call(this.baseRow, col)) {
        if (
          row[col] instanceof Object &&
          !Array.isArray(row[col]) &&
          this.baseRow[col] instanceof Object &&
          !Array.isArray(this.baseRow[col])
        ) {
          this.row[col] = {};
          this.row[col] = this.filter(row[col], this.baseRow[col]);
        } else {
          this.row[col] = row[col];
        }
      }
    }
    this.transformAll();
    return this.row;
  };

  this.setFilter = function (filter) {
    this.filter = filter;
  };

  this.isEmpty = function () {
    return Object.keys(this.row).length === 0;
  };

  this.separe = function () {
    this.columns = Object.keys(this.row);
    this.values = Object.values(this.row);
    return [this.columns, this.values];
  };

  this.columnsJoin = function (separator = ", ") {
    this.separe();
    return this.columns.join(separator);
  };

  this.getValues = function () {
    this.separe();
    return this.values;
  };

  this.getQuestionMarks = function () {
    this.separe();
    return Array(this.columns.length).fill("?").join(", ");
  };

  this.setTransformer = function (prop, transformer) {
    this.transformers[prop] = transformer;
  };

  this.transformAll = function () {
    for (const key in this.transformers) {
      if (Object.prototype.hasOwnProperty.call(this.row, key)) {
        const oldValue = this.row[key];
        const transformer = this.transformers[key];
        const newValue = transformer(oldValue, this.row);
        this.row[key] = newValue;
      }
    }
  };

  this.set = function (pro, value) {
    if (Object.prototype.hasOwnProperty.call(this.baseRow, pro)) {
      if (Object.prototype.hasOwnProperty.call(this.transformers, pro)) {
        const transformer = this.transformers[pro];
        value = transformer(value, this.row);
      }
      return (this.row[pro] = value);
    }
    return value;
  };

  this.rawSet = function (pro, value) {
    if (Object.prototype.hasOwnProperty.call(this.transformers, pro)) {
      const transformer = this.transformers[pro];
      value = transformer(value, this.row);
    }
    return (this.row[pro] = value);
  };

  this.getProxy = function () {
    const handlerProxy = {
      set(obj, prop, value) {
        return obj.set(prop, value);
      },
    };
    return new Proxy(this, handlerProxy);
  };

  this.setRawRow = function (row) {
    this.row = row;
    this.baseRow = row;
  };

  this.genWhere = function (operathor = "=", glue = " AND ") {
    return this.columnsJoin(` ${operathor} ? ${glue} `) + " = ?";
  };

  this.genUpdateCol = function (glue = ", ") {
    return this.columnsJoin(` = ?${glue} `) + " = ?";
  };
};

sqlGenerator.genSelect = (columns = {}, prefix = "", glue = ", ") => {
  const selectCols = [];
  for (const col in columns) {
    if (columns[col] !== null) {
      selectCols.push(`${prefix}${col} AS '${columns[col]}'`);
    } else {
      selectCols.push(`${prefix}${col}`);
    }
  }
  return selectCols.join(glue);
};

module.exports = { sqlGenerator };
