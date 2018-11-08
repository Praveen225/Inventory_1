sap.ui.define([
	"sap/ui/core/mvc/Controller",
	'sap/ui/model/json/JSONModel',
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator'
], function (Controller, JSONModel, Filter, FilterOperator) {
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
			var obj = oEvent.getParameters().listItem.getBindingContext().getObject(),
			jmodel = this.getView().getModel("data");
			jmodel.setProperty("/notiData", obj);
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
		onReject: function(){
			var oView = this.getView();
			var oDialog = oView.byId("idHrDialog");
			if (!oDialog) {
				oDialog = sap.ui.xmlfragment(oView.getId(), "inventory.Inventory.view.hrRejectDescription", this);
				oView.addDependent(oDialog);
			}
			oDialog.open();
		},
		onHrRejectClose: function(){
			this.getView().byId("idHrDialog").close();
		}

	});

});