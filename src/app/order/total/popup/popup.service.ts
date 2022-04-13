import { ApplicationRef, ComponentFactoryResolver, Injectable, Injector } from '@angular/core';
import { NgElement, WithProperties } from '@angular/elements';
import { Subject } from 'rxjs';
import { PopupComponent } from './popup.component';

@Injectable({
  providedIn: 'root'
})
export class PopupService {
  
  public confirmation$ = new Subject<boolean>();
  
  constructor(
    private injector: Injector,
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver
  ) { }

  showPopupComponent() {
    // Создание элемента
    const popup = document.createElement('popup-component');

    // Создание компонента и соединение его с элементом

    const factory = this.componentFactoryResolver.resolveComponentFactory(PopupComponent);
    const popupComponentRef = factory.create(this.injector, [], popup);

    // Прикрепление к дереву встроенных представлений, собранных в Контейнере представлений (ViewContainerRef)
    // Корневое представление (hostView) - это представление узла компонента.
    //Иерархия представлений является ключевой частью обнаружения угловых изменений, для этого производится прикрепление

    this.applicationRef.attachView(popupComponentRef.hostView);

    // Обнаружение события
    popupComponentRef.instance.closed.subscribe(() => {
      document.body.removeChild(popup);
      this.applicationRef.detachView(popupComponentRef.hostView);
    });

    /*popupComponentRef.instance.confirm.subscribe(() => {
      document.body.removeChild(popup);
      this.applicationRef.detachView(popupComponentRef.hostView);
    });*/

    // Add to the DOM
    document.body.appendChild(popup);
  }

  confirmSubmission() {
    this.confirmation$.next(true);
  }
}
