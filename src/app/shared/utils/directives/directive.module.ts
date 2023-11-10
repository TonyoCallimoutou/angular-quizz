import {HighlightDirective} from "./highlight.directive";
import {NgModule} from "@angular/core";
import {PrefixDirective} from "./prefix.directive";

@NgModule({
  declarations: [
    HighlightDirective,
    PrefixDirective,
  ],
  imports: [
  ],
  providers: [],
  exports: [
    HighlightDirective,
    PrefixDirective
  ]
})
export class DirectiveModule { }
