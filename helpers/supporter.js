const getResponseObject = ()=> ({
	status: "success",
	message: "",
	data: {},
	errorCode: null
});

const getErrorResponse = (message,errCode,where)=> ({
	status: "error",
	message: message || "",
	data: {},
    errorAt: where || "",
	errorCode: errCode || ""
});
module.exports = {
	getResponseObject,
	getErrorResponse,
};