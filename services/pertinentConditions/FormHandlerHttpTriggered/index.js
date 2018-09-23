module.exports = function (context, req) {
    if (req.body) {
        context.res = {
            status: 201,
            //body: context.req.body
            body: 'Hello from FormHandlerHttpTriggered at Azure Functions!'
        };
    }
    else {
        context.res = {
            status: 400,
            body: "Please send JSON in the body"
        };
    }
    context.done();
} 