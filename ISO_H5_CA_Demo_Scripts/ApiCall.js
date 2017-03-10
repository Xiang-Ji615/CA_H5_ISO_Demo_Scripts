var ApiCall = (function () {
    function ApiCall(args) {
        this.controller = args.controller;
        this.log = args.log;
    }
    /**
    * Script initialization function.
    */
    ApiCall.Init = function (args) {
        new ApiCall(args).run();
    };
    ApiCall.prototype.run = function () {
        var _this = this;
        //Add button
        var buttonElement = new ButtonElement();
        buttonElement.Name = "btnAPICall";
        buttonElement.Value = "PPS200 GetHead";
        buttonElement.Position = new PositionElement();
        buttonElement.Position.Top = 1;
        buttonElement.Position.Left = 1;
        buttonElement.Position.Width = 5;
        var contentElement = this.controller.GetContentElement();
        var button = contentElement.AddElement(buttonElement);
        //Add click event handler to button
        ScriptUtil.AddEventHandler(button, "click", function (event) {
            _this.onClick();
        });
    };
    ApiCall.prototype.ShowMessage = function(message) {
        ConfirmDialog.ShowMessageDialog({
            dialogType: "Information",
            header: "From APICall.js",
            message: message,
        });
    };
    ApiCall.prototype.onClick = function () {
        //Get value of first column of first selected row
        console.log(ListControl.ListView.GetValueByColumnIndex(2)[0]);
        var puno = ListControl.ListView.GetValueByColumnIndex(2)[0];
        if (!puno) {
             this.__proto__.ShowMessage("No selected row");
            return;
        }
        this.__proto__.ApiCallPPS200Mi(this, 110, puno);
    };

     ApiCall.prototype.ApiCallPPS200Mi = function(context, cono, puno) {
        var _this = this;
    $.ajax({
            context: _this,
            url: 'http://m3app-2014.comactivity.com.au:20014/m3api-rest/execute/PPS200MI/GetHead?CONO=' + cono + '&PUNO='+puno,
            type: 'GET',
            async:false,
            dataType: 'json',
            // data: {param1: 'value1'},
            success: function(miResult) {
                console.log(miResult.MIRecord[0]);
                var bram = $.grep(miResult.MIRecord[0].NameValue, function(e) {
                    return e.Name == 'BRAM';
                })[0].Value;
                // console.log(_this);
                _this.ShowMessage("Total value gross: "+bram);
            }
        })
        .done(function() {
            //console.log("success");
        })
        .fail(function() {
            //console.log("error");
        })
        .always(function() {
            //console.log("complete");
        });
}
    return ApiCall;
})();