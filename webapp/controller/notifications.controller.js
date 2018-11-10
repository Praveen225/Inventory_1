sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/json/JSONModel',
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator',
	"sap/m/MessageToast",
], function (Controller, JSONModel, Filter, FilterOperator, MessageToast) {
	"use strict";

	return Controller.extend("inventory.Inventory.controller.AdminPage", {
		onInit: function () {
			var oModel = new JSONModel(jQuery.sap.getModulePath("inventory.Inventory", "/data.json"));
			this.getView().setModel(oModel);
			this.getView().setModel(new JSONModel(), "jmodel");
		},
		onEventPress: function (oEvent) {
			var twoColumn = this.getView().byId("idFlexibleColumn");
			twoColumn.setLayout(sap.f.LayoutType.TwoColumnsMidExpanded);
			this.obj = oEvent.getParameters().listItem.getBindingContext("data").getObject();
			var jmodel = this.getView().getModel("data");
			jmodel.setProperty("/notiData", this.obj);
			this.getView().byId("beginPage").setShowFooter(true);
		},
		onClosingDetail: function () {
			var oneColumn = this.getView().byId("idFlexibleColumn");
			oneColumn.setLayout(sap.f.LayoutType.OneColumn);
			this.getView().byId("beginPage").setShowFooter(false);
		},
		onSearch: function () {
			var aFilter = [];
			var sQuery = this.getView().byId("input").getValue();
			if (sQuery) {
				aFilter.push(new Filter("tNo", FilterOperator.Contains, sQuery));
			}
			var oList = this.getView().byId("notfList");
			var oBinding = oList.getBinding("items");
			oBinding.filter(aFilter);
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
			var tNo = this.obj.ticketNo;
			var nId = this.obj.id;
			var empObj = this.getView().getModel("data").getProperty("/status/0/" + nId);
			var tlRejDec = this.getView().byId("idHrRejDec").getProperty("value");
			for (var i = 0; i < empObj.length; i++) {
				if (empObj[i].ticketNo === tNo) {
					this.getView().getModel("data").setProperty("/status/0/" + nId + "/" + i + "/hrRejDec", tlRejDec);
					this.getView().getModel("data").setProperty("/status/0/" + nId + "/" + i + "/vis", true);
				}
			}
			MessageToast.show("Issue Has Been Rejected");
		},
		onLogout: function () {
			var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
			oRouter.navTo("login");
			this.getView().byId("bell").setVisible(false);
		},
		onHrAccept: function () {
			var tNo = this.obj.ticketNo;
			var nId = this.obj.id;
			var empObj = this.getView().getModel("data").getProperty("/status/0/" + nId);
			for (var i = 0; i < empObj.length; i++) {
				if (empObj[i].ticketNo === tNo) {
					this.getView().getModel("data").setProperty("/status/0/" + nId + "/" + i + "/hrWaitins", "sap-icon://accept");
					this.getView().getModel("data").setProperty("/status/0/" + nId + "/" + i + "/hrWaitingText", "HR Accepted");
				}
			}
			MessageToast.show("Issue Has Been Approved");
		}

	});

});