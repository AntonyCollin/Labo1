module.exports =
    class MiddlewaresPipeline {
        constructor() {
            this.middlewares = [];
        }
        add(middleware) {
            this.middlewares.push(middleware);
        }
        async handleHttpRequest(HttpContext) {
            for (let middleware of this.middlewares) {
                if (await (middleware(HttpContext))) return true;
            }
            return false;
        }
    }