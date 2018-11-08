sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/m/MessageToast"
], function (Controller, MessageToast) {
	"use strict";

	return Controller.extend("inventory.Inventory.controller.EmployeePage", {

		/**
		 * Called when a controller is instantiated and its View controls (if available) are already created.
		 * Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
		 * @memberOf inventory.Inventory.view.EmployeePage
		 */
		onInit: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.getRoute("EmployeePage").attachMatched(this._onObjectMatched, this);
		},

		_onObjectMatched: function (oEvent) {
			var oArg = oEvent.getParameters("arguments");
			var oView = this.getView();
			oView.setModel(this.getOwnerComponent().getModel("data"));
			oView.bindElement("/empInfo/" + oArg.arguments.obj);
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

			this.obj = {
				issue: this.comboValue,
				description: empDescription,
				Date: this.datePicker,
				id: id,
				ticketNo: ticketNo
			};
			var myArray = [];
			var oModel = this.getView().getModel("data");
			var oData = this.getView().getModel("data").oData;
			for (var i = 0; i < oData.status[0][id].length; i++) {
				myArray.push(oData.status[0][id][i]);
			}
			if (empDescription !== "" && this.comboValue !== "" && this.datePicker !== "") {
				myArray.push(this.obj);
				/*console.log(oModel.getProperty("/status/0"));*/
				oModel.setProperty("/status/0/" + id, myArray);
				myArray = oModel.getProperty("/status/0/" + id, myArray);
				oModel.setProperty("/status/0/" + id, myArray);
				MessageToast.show("Your Complaint Has Been Received");
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
		onLogout : function(){
				var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("login");	
		}

	});

});