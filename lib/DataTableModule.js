"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var BootstrapPaginator_1 = require("./BootstrapPaginator");
var DataTable_1 = require("./DataTable");
var DefaultSorter_1 = require("./DefaultSorter");
var Paginator_1 = require("./Paginator");
var RowSelector_1 = require("./RowSelector");
var RowSelectorHead_1 = require("./RowSelectorHead");
var common_1 = require("@angular/common");
var DataTableModule = (function () {
    function DataTableModule() {
    }
    return DataTableModule;
}());
DataTableModule = __decorate([
    core_1.NgModule({
        imports: [common_1.CommonModule],
        declarations: [BootstrapPaginator_1.BootstrapPaginator, DataTable_1.DataTable, DefaultSorter_1.DefaultSorter, Paginator_1.Paginator, RowSelector_1.RowSelector, RowSelectorHead_1.RowSelectorHead],
        exports: [BootstrapPaginator_1.BootstrapPaginator, DataTable_1.DataTable, DefaultSorter_1.DefaultSorter, Paginator_1.Paginator, RowSelector_1.RowSelector, RowSelectorHead_1.RowSelectorHead]
    })
], DataTableModule);
exports.DataTableModule = DataTableModule;
//# sourceMappingURL=DataTableModule.js.map