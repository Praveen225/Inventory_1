sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("inventory.Inventory.controller.EmployeePage", {

		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("EmployeePage").attachMatched(this._onObjectMatched, this);
			/*var desig = this.getView().byId("desig").getValue();
			if(desig === "Team Lead"){
				this.getView().byId("bell").setVisible(true);
			}*/
		},
		/*onAfterRendering: function(){
		var desig = this.getView().byId("desig").getValue();
			if(desig === "Team Lead"){
				this.getView().byId("bell").setVisible(true);
			}	
		},*/

		_onObjectMatched: function (oEvent) {
			var oArg = oEvent.getParameters("arguments");
			var oView = this.getView();
			oView.setModel(this.getOwnerComponent().getModel("data"));
			oView.bindElement("/empInfo/" + oArg.arguments.obj);
			var are = oArg.arguments.obj;
			var designation = this.getView().getModel("data").getProperty("/empInfo/" + are + "/designation/");
			if (designation === "Team Lead") {
				this.getView().byId("bell").setVisible(true);
			}
		},
		onPressStatus: function (oEvent) {
				var id = this.getView().byId("Id").getProperty("text");
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
				oRouter.navTo("StatusPage", {
					obj: id
				});

			}
			/*,
					reset: function () {
						this.getView().byId("desId").setValue('');
						this.getView().byId("empName").setValue('');
						this.getView().byId("empPassword").setValue('');
					}*/
			,
		onSubmit: function (oEvent) {
			var empDescription = this.byId("desId").getValue();
			var id = this.getView().byId("Id").getProperty("text");
			var ticketNo = Math.floor((Math.random() * 10000000000) + 1);
			var desig = this.getView().byId("desig").getProperty("text");
			var empName = this.getView().byId("name").getProperty("text");
			var inprocess="sap-icon://status-in-process";
			var waiting="sap-icon://lateness";
			var TlInprocess="Tl Inprocess";
			var HRWaiting="HR Waiting";
			this.obj = {
				issue: this.comboValue,
				description: empDescription,
				Date: this.datePicker,
				id: id,
				name: empName,
				Designation: desig,
				ticketNo: ticketNo,
				tlInprocess:inprocess,
                tlInprocessText:TlInprocess,
                hrWaitins:waiting,
               hrWaitingText:HRWaiting
			};
			var myArray = [];
			var newData = [];
			var oModel = this.getView().getModel("data");
			var oData = this.getView().getModel("data").oData;
			for (var i = 0; i < oData.status[0][id].length; i++) {
				myArray.push(oData.status[0][id][i]);
			}
			if (empDescription !== "" && this.comboValue !== "" && this.datePicker !== "") {
				myArray.push(this.obj);
				oModel.setProperty("/status/0/" + id, myArray);
				myArray = oModel.getProperty("/status/0/" + id, myArray);
				oModel.setProperty("/status/0/" + id, myArray);
				MessageToast.show("Your Complaint Has Been Received");
				/*var oData = this.getView().getModel("data").oData;*/
				var allData = this.getView().getModel("data").oData.allData;
				for (var j = 0; j < oData.allData.length; j++) {
				newData.push(oData.allData[j]);
				}
				newData.unshift(this.obj);
				this.getView().getModel("data").setProperty("/allData/", newData);
			}
			if (empDescription == "" && this.comboValue == "" && this.datePicker == "") {
				MessageToast.show("Please enter all the Feilds");
			}
		},
		onChange: function (oEvent) {
			this.comboValue = oEvent.getParameters().value;
		},
		handleChange: function (oEvent) {
			this.datePicker = oEvent.getParameters().value;
		},
		onLogout: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("login");
		},
		empNotification: function () {
			/*var path = this.getView().getBindingContext().sPath.substring();
			var index = path.substring(path.lastIndexOf('/') + 1);
			var oModel = this.getView().getParent().getModel("data").oData.empInfo;
			for (var i = 0; i < oModel.length; i++) {
				if (oModel[i].id === index) {
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("emp_Notification", {
						obj: i
					});
				}
			}*/
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("emp_Notification");
		}

	});

});