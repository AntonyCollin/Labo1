module.exports =
    class Controller {
        constructor(HttpContext) {
            this.HttpContext = HttpContext;
        }
        head() {
            this.HttpContext.response.notImplemented();
        }
        get(id) {
            this.HttpContext.response.notImplemented();
        }
        post(data) {
            this.HttpContext.response.notImplemented();
        }
        put(data) {
            this.HttpContext.response.notImplemented();
        }
        remove(id) {
            this.HttpContext.response.notImplemented();
        }
    }
