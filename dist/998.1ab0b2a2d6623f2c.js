"use strict";(self.webpackChunkngx_admin_demo=self.webpackChunkngx_admin_demo||[]).push([[998],{60998:(y,d,r)=>{r.r(d),r.d(d,{TablesModule:()=>v});var s=r(99693),c=r(74385),g=r(49261),m=r(42268),o=r(5e3);let u=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275cmp=o.\u0275\u0275defineComponent({type:n,selectors:[["ngx-tables"]],decls:1,vars:0,template:function(e,t){1&e&&o.\u0275\u0275element(0,"router-outlet")},directives:[m.lC],encapsulation:2}),n})();var C=r(17489),h=r.n(C),b=r(74574);const p=[{path:"",component:u,children:[{path:"",component:(()=>{class n{constructor(e,t){this.ingredientsService=e,this.toastrService=t,this.settings={add:{addButtonContent:'<i class="nb-plus"></i>',createButtonContent:'<i class="nb-checkmark"></i>',cancelButtonContent:'<i class="nb-close"></i>',confirmCreate:!0},edit:{editButtonContent:'<i class="nb-edit"></i>',saveButtonContent:'<i class="nb-checkmark"></i>',cancelButtonContent:'<i class="nb-close"></i>',confirmSave:!0},delete:{deleteButtonContent:'<i class="nb-trash"></i>',confirmDelete:!0},columns:{id:{title:"ID",type:"number",hide:!0},name:{title:"Name",type:"string",editor:{type:"list",config:{list:[{value:"proteins",title:"Proteins"},{value:"carbohydrates",title:"Carbohydrates"},{value:"fats",title:"Fats"},{value:"calories",title:"Calories"}]}}},amount:{title:"Amount",type:"number"}}},this.source=new c.nC,this.loadData()}loadData(){this.ingredientsService.get().subscribe(e=>{e=h().orderBy(e,["id"],["desc"]),this.source.load(e).catch(t=>{this.showToast("danger","Failed to load data",t.error.message.join?t.error.message.join(", "):t.error.message)})},e=>{this.showToast("danger","Failed to load data",e.error.message.join?e.error.message.join(", "):e.error.message)})}onDeleteConfirm(e){window.confirm("Are you sure you want to delete?")?this.ingredientsService.delete(e.data.id).subscribe(()=>{e.confirm.resolve()},t=>{e.confirm.reject(),this.showToast("danger","Failed to delete",t.error.message.join?t.error.message.join(", "):t.error.message)}):e.confirm.reject()}onCreateConfirm(e){this.ingredientsService.create(e.newData).subscribe(()=>{e.confirm.resolve(),this.loadData()},t=>{e.confirm.reject(),this.showToast("danger","Failed to create",t.error.message.join?t.error.message.join(", "):t.error.message)})}onEditConfirm(e){this.ingredientsService.update(e.newData.id,e.newData).subscribe(()=>{e.confirm.resolve()},t=>{e.confirm.reject(),this.showToast("danger","Failed to update",t.error.message.join?t.error.message.join(", "):t.error.message)})}showToast(e,t,l){this.toastrService.show(l,t,{status:e,destroyByClick:!0,duration:5e3,hasIcon:!0,position:s.fe3.TOP_RIGHT,preventDuplicates:!1})}}return n.\u0275fac=function(e){return new(e||n)(o.\u0275\u0275directiveInject(b.z),o.\u0275\u0275directiveInject(s.quB))},n.\u0275cmp=o.\u0275\u0275defineComponent({type:n,selectors:[["ngx-smart-table"]],decls:5,vars:2,consts:[[3,"settings","source","deleteConfirm","createConfirm","editConfirm"]],template:function(e,t){1&e&&(o.\u0275\u0275elementStart(0,"nb-card")(1,"nb-card-header"),o.\u0275\u0275text(2," Daily recommended consumption "),o.\u0275\u0275elementEnd(),o.\u0275\u0275elementStart(3,"nb-card-body")(4,"ng2-smart-table",0),o.\u0275\u0275listener("deleteConfirm",function(i){return t.onDeleteConfirm(i)})("createConfirm",function(i){return t.onCreateConfirm(i)})("editConfirm",function(i){return t.onEditConfirm(i)}),o.\u0275\u0275elementEnd()()()),2&e&&(o.\u0275\u0275advance(4),o.\u0275\u0275property("settings",t.settings)("source",t.source))},directives:[s.Asz,s.ndF,s.yKW,c.T5],styles:["[_nghost-%COMP%]   nb-card[_ngcontent-%COMP%]{transform:translate(0)}"]}),n})()}]}];let T=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=o.\u0275\u0275defineNgModule({type:n}),n.\u0275inj=o.\u0275\u0275defineInjector({imports:[[m.Bz.forChild(p)],m.Bz]}),n})(),v=(()=>{class n{}return n.\u0275fac=function(e){return new(e||n)},n.\u0275mod=o.\u0275\u0275defineNgModule({type:n}),n.\u0275inj=o.\u0275\u0275defineInjector({imports:[[s.zyh,s.caZ,s.KdK,s.nKr,g.O,T,c.ne]]}),n})()}}]);