const fs = require("fs");
const util = require("util");
exports.redirectUrl = (fields, requiredFields) => {
  return [
    {
      source: "/about",
      destination: "https://google.com/about",
      permanent: false,
    },
  ];
};
exports.logInfo = () => {
  var fs = require("fs");
  var util = require("util");
  var log_file = fs.createWriteStream(__dirname + "/debug.log", { flags: "w" });
  var log_stdout = process.stdout;
  console.log = function (d) {
    //
    log_file.write(util.format(d) + "\n");
    log_stdout.write(util.format(d) + "\n");
  };
};

exports.addDecimals = (numbers) => {
  const sum = numbers.reduce((a, b) => parseFloat(a) + parseFloat(b), 0);
  return sum.toFixed(2);
};

exports.subtractDecimals=(from,numbers)=>{
    const sum=numbers.reduce((a, b)=> parseFloat(a) - parseFloat(b), from)
    return sum.toFixed(2);
}
exports.calPer=(amount,numPer)=>{
    return (amount/100) * numPer
}
exports.replace=(text,replace)=>{
    for (const key in replace) {
        text=text.replace(`{${key}}`,replace[key]);
    }
    return text;
}

exports.calPaypalFee=(amount,percentage)=>{
    let fee=0;
    while(parseFloat(amount) > 0.1){
        fee=exports.addDecimals([fee,exports.calPer(amount,percentage)])
        amount=exports.calPer(amount,percentage);
    }
    return fee;
}

