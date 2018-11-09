sap.ui.define([
	"sap/ui/core/mvc/Controller",
	"sap/ui/model/json/JSONModel",
	"sap/ui/model/Filter",
	"sap/ui/model/FilterOperator",
	"sap/m/MessageToast"
], function (Controller, JSONModel, Filter, FilterOperator, MessageToast) {
	"use strict";

	return Controller.extend("inventory.Inventory.controller.emp_Notification", {

		onInit: function () {
			/*this.getView().setModel(new JSONModel(), "data");*/
			this.getView().byId("emptyId").setVisible(true);
			this.getView().byId("SimpleFormDisplay").setVisible(false);
		},

		onReject: function () {
			var oView = this.getView();
			var oDialog = oView.byId("idHrDialog");
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "inventory.Inventory.view.hrRejectDescription", this);
				oView.addDependent(oDialog);
			}
			oDialog.open();
		},
		onHrRejectClose: function () {
			this.getView().byId("idHrDialog").close();
		},
		onClick: function (oEvent) {
			var path = this.getView().getBindingContext().sPath.substring();
			var index = path.substring(path.lastIndexOf('/') + 1);
			var oModel = this.getView().getParent().getModel("data").oData.empInfo;
			for (var i = 0; i < oModel.length; i++) {
				if (oModel[i].id === index) {
					var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
					oRouter.navTo("EmployeePage", {
						obj: i
					});
				}
			}

		},
		onLogout: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("login");
		},
		onItemPressed: function (oEvent) {
			/*this.getView().setModel(new JSONModel(), "data");*/
			this.getView().byId("emptyId").setVisible(false);
			this.getView().byId("SimpleFormDisplay").setVisible(true);
			this.obj = oEvent.getParameters().listItem.getBindingContext("data").getObject();
			var oDetails = this.getView().getModel("data");
			oDetails.setProperty("/odata", this.obj);
		},
		onSearch: function (oEvent) {
			var olist = this.getView().byId("list1"),
				arr = [],
				binding,
				filters;
			filters = new Filter({
				filters: [new Filter("ticketNo", FilterOperator.Contains, oEvent.getSource().getValue()),
					new Filter("Date", FilterOperator.Contains, oEvent.getSource().getValue())
				],
				and: false
			});
			binding = olist.getBinding("items");
			arr.push(filters);
			binding.filter(arr);
			binding.filter(arr);
		},
		onApproved: function () {
			var tcNo = this.obj.ticketNo;
			var id = this.obj.id;
			var ctid = this.getView().getModel("data").getProperty("/status/0/" + id);
			var notif = this.getView().getModel("data").getProperty("/status/0/" + id);
			for (var i = 0; i < ctid.length; i++) {
				if (ctid[i].ticketNo === tcNo) {

					this.getView().getModel("data").setProperty("/status/0/" + id + "/" + i + "/tlInprocess", "sap-icon://accept");
					this.getView().getModel("data").setProperty("/status/0/" + id + "/" + i + "/tlInprocessText", "TL Accepted");
					this.getView().getModel("data").setProperty("/status/0/" + id + "/" + i + "/hrWaitins", "sap-icon://status-in-process");
					this.getView().getModel("data").setProperty("/status/0/" + id + "/" + i + "/hrWaitingText", "HR Inprocess");
				}
			}
			/*if(){
				
			}*/

		}

	});

});