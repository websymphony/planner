import shortid from "shortid";

class Lib {
  static dateFormat = "YYYY-MM-DD";

  static saveableDateFormat(momentDate) {
    return momentDate.format(Lib.dateFormat);
  }

  static generateID(type) {
    return type + "_" + shortid.generate();
  }
}

export default Lib;
