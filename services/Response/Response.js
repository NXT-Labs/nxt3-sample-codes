const responseCodes = require("../../constants/ResponseCodes");
const {
  FAILURE,
  BAD_REQUEST,
  NOT_FOUND,
  UNAUTHORIZED,
  ALREADY_LOGGED_OUT,
} = require("../../constants/Responses");

const responeObject = (status, success, data, error) => {
  return {
    status: {
      code: status,
      success: success,
    },
    data: data,
    error: error,
  };
};

const serverErrorResponse = (res, message) => {
  res.status(responseCodes.SERVER_ERROR).send(
    responeObject(responseCodes.SERVER_ERROR, false, null, {
      message: message ? message : FAILURE,
    })
  );
};

const badRequestResponse = (res, message) => {
  res.status(responseCodes.BAD_REQUEST).send(
    responeObject(responseCodes.BAD_REQUEST, false, null, {
      message: message ? message : BAD_REQUEST,
    })
  );
};

const notFoundResponse = (res, message) => {
  res.status(responseCodes.NOT_FOUND).send(
    responeObject(responseCodes.NOT_FOUND, false, null, {
      message: message ? message : NOT_FOUND,
    })
  );
};

const unauthorizedResponse = (res, message) => {
  res.status(responseCodes.UNAUTHORIZED).send(
    responeObject(responseCodes.UNAUTHORIZED, false, null, {
      message: message ? message : UNAUTHORIZED,
    })
  );
};

const successResponse = (res, dataObj) => {
  res
    .status(responseCodes.SUCCESS)
    .send(responeObject(responseCodes.SUCCESS, true, dataObj, null));
};

const alreadyLoggedOut = (res) => {
  res.status(responseCodes.BAD_REQUEST).send(
    responeObject(responseCodes.BAD_REQUEST, false, null, {
      message: ALREADY_LOGGED_OUT,
    })
  );
};
const genericResponseByData=(data,msg) => {
  if(data){
    const success=msg && typeof msg.success != "undefined" ? msg.success :"success";
    return  {status:{code:200,success:true},data:data,error:false,msg:success};
  }else{
    const error=msg && typeof msg.error != "undefined" ? msg.error :"something went wrong";
    return {status: {code:500,success:false},error:{message:error },data:null,code:500};
  }
}
const paginate=(shopsItems,limit)=>{
  limit=limit||10;
  if(shopsItems.rows.length > 0){
    shopsItems.pageCount=Math.ceil(shopsItems.count/limit);
    return shopsItems;
  }else{
    return false;
  }
}
module.exports = {
  serverErrorResponse,
  badRequestResponse,
  successResponse,
  notFoundResponse,
  unauthorizedResponse,
  alreadyLoggedOut,
  genericResponseByData,
  paginate
};
