const path = require("path");
const fs = require("fs");

module.exports = class MathsController extends require("./Controller") {
  constructor(HttpContext) {
    super(HttpContext);
  }
  get() {
    if (this.HttpContext.path.queryString == "?") {
      let helpPage = path.join(
        process.cwd(),
        "wwwroot/helpPages/MathsServiceHelp.html"
      );
      let pageContent = fs.readFileSync(helpPage);
      this.HttpContext.response.content("text/html", pageContent); // text/html c le mime pour savoir comment interpreter ces donnees
    } else {
      if (this.HttpContext.path.params.op && (this.HttpContext.path.params.op == ' ' || this.HttpContext.path.params.op == '-' || this.HttpContext.path.params.op == '*' || this.HttpContext.path.params.op == '/' || this.HttpContext.path.params.op == '%' || this.HttpContext.path.params.op == '!' || this.HttpContext.path.params.op == 'p' || this.HttpContext.path.params.op == 'np')) {
        // if there is op

        if (this.HttpContext.path.params.x && this.HttpContext.path.params.y && (this.HttpContext.path.params.op == ' ' || this.HttpContext.path.params.op == '-' || this.HttpContext.path.params.op == '*' || this.HttpContext.path.params.op == '/' || this.HttpContext.path.params.op == '%')) { // if x and y
          if (this.HttpContext.path.params.op == " ") {
            // if op is +
            this.HttpContext.path.params.op = "+";
          }

          let data = {
            op: this.HttpContext.path.params.op,
            x: this.HttpContext.path.params.x,
            y: this.HttpContext.path.params.y
          };

          switch (this.HttpContext.path.params.op) {
            case "+":
                data = basicOpVerif(this.HttpContext.path.params, data);

                if (!data.hasOwnProperty('error'))
                {
                    data.value =
                    parseFloat(this.HttpContext.path.params.x) +
                    parseFloat(this.HttpContext.path.params.y);
                }
            
                this.HttpContext.response.JSON(data);
              break;

            case "-":
                data = basicOpVerif(this.HttpContext.path.params, data);

                if (!data.hasOwnProperty('error'))
                {
                    data.value =
                    parseFloat(this.HttpContext.path.params.x) -
                    parseFloat(this.HttpContext.path.params.y);
                }
            
                this.HttpContext.response.JSON(data);
              break;

            case "*":

                data = basicOpVerif(this.HttpContext.path.params, data);

                if (!data.hasOwnProperty('error'))
                {
                    data.value =
                    parseFloat(this.HttpContext.path.params.x) *
                    parseFloat(this.HttpContext.path.params.y);
                }
            
                this.HttpContext.response.JSON(data);
            
              break;

            case "/":
                data = basicOpVerif(this.HttpContext.path.params, data);

                if (!data.hasOwnProperty('error'))
                {
                    data.value =
                    parseFloat(this.HttpContext.path.params.x) /
                    parseFloat(this.HttpContext.path.params.y);
                }
            
                this.HttpContext.response.JSON(data);
              break;

            case "%":
                data = basicOpVerif(this.HttpContext.path.params, data);

                if (!data.hasOwnProperty('error'))
                {
                    data.value =
                    parseFloat(this.HttpContext.path.params.x) %
                    parseFloat(this.HttpContext.path.params.y);
                }
            
                this.HttpContext.response.JSON(data);
              break;

            
          }
        }
        else if (this.HttpContext.path.params.n && (this.HttpContext.path.params.op == '!' || this.HttpContext.path.params.op == 'p' || this.HttpContext.path.params.op == 'np'))
        {
            let data = {
                op: this.HttpContext.path.params.op,
                n: this.HttpContext.path.params.n
              };

            switch (this.HttpContext.path.params.op)
            {

            case "!":

                data = otherOpVerif(this.HttpContext.path.params, data);

                if (!data.hasOwnProperty('error'))
                {
                    data.value =
                    factorial(this.HttpContext.path.params.n);
                }
            
                this.HttpContext.response.JSON(data);
              break;
            case "p":
                data = otherOpVerif(this.HttpContext.path.params, data);

                if (!data.hasOwnProperty('error'))
                {
                    data.value =
                    isPrime(this.HttpContext.path.params.n);
                }
            
                this.HttpContext.response.JSON(data);
              break;
            case "np":
                data = otherOpVerif(this.HttpContext.path.params, data);

                if (!data.hasOwnProperty('error'))
                {
                    data.value =
                    findPrime(this.HttpContext.path.params.n);
                }
            
                this.HttpContext.response.JSON(data);
              break;
            }
        }
        else
        {
            let responseObj = { error: "parameters are invalid" };
        this.HttpContext.response.JSON(responseObj);
        }
      } else {
        // if no op
        let responseObj = { error: "op is missing or not valid" };
        this.HttpContext.response.JSON(responseObj);
      }
    }
  }
};

function factorial(n){
    if(n===0||n===1){
      return 1;
    }
    return n*factorial(n-1);
}

function isPrime(value) {
    for(var i = 2; i < value; i++) {
        if(value % i === 0) {
            return false;
        }
    }
    return value > 1;
}

function findPrime(n){
    let primeNumer = 0;
    for ( let i=0; i < n; i++){
        primeNumer++;
        while (!isPrime(primeNumer)){
            primeNumer++;
        }
    }
    return primeNumer;
}

function basicOpVerif(httpCtx, data)
{
    if (isNaN(httpCtx.x) || (httpCtx.x == 0 && (httpCtx.op == '/' || httpCtx.op == '%')))
            {
                data.error = "x parameter is not a valid number";
            }
            
            if (isNaN(httpCtx.y) || (httpCtx.y == 0 && (httpCtx.op == '/' || httpCtx.op == '%')))
            {
                data.error = "y parameter is not a valid number";
            }

            if (isNaN(httpCtx.y) || (httpCtx.x == 0 && (httpCtx.op == '/' || httpCtx.op == '%')) && isNaN(httpCtx.y) || (httpCtx.y == 0 && (httpCtx.op == '/' || httpCtx.op == '%')))
            {
                data.error = "x and y parameter are not valid numbers";
            }

            return data;
}

function otherOpVerif(httpCtx, data)
{
    if (isNaN(httpCtx.n))
            {
                data.error = "n parameter is not a number";
            }

            return data;
}
