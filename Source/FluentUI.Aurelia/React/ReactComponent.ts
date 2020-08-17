// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import * as React from 'react';
import * as ReactDom from 'react-dom';

import { Constructor } from '@dolittle/rudiments';
import { ComponentProperties } from './ComponentProperties';
import { ComponentProperty } from './ComponentProperty';
import { ReactBase } from './ReactBase';
import { DOMUtility } from './DOMUtility';

export class ReactComponent<TComponent extends React.Component<TProps, any> | React.FunctionComponent<TProps>, TProps> extends ReactBase<TProps> {
    componentType: Constructor<TComponent> | React.FunctionComponent<TProps> | undefined;
    container: Element;
    properties: ComponentProperty[];
    aureliaContainer?: Element;
    reactComponent?: any;

    private _readyToConsolidateBackCallback?: Function;

    constructor(element: Element, componentType?: Constructor<TComponent> | React.FunctionComponent<TProps>, private _wrapperType?: any) {
        super(element);

        this.componentType = componentType;

        this.props.id = this.reactUniqueIdentifier;
        if (!_wrapperType) {
            this._wrapperType = componentType;
            if (this._wrapperType.prototype && this._wrapperType.prototype.isReactComponent) {
                this.props.ref = DOMUtility.getReferenceCallbackFor(this);
            }
        } else {
            this.props._component = this;
            this.props._componentType = this.componentType;
        }

        this.container = element;
        this.properties = ComponentProperties.getFor(this.constructor);
    }

    getSourceElementToConsolidateFrom(): Element {
        return this.element;
    }

    onReadyToConsolidateBack(callback: Function): void {
        const delayed = this.properties.some((_: ComponentProperty) => _.reactName === 'onDismissed');
        if (delayed) {
            this._readyToConsolidateBackCallback = callback;
        } else {
            callback();
        }
    }

    onDismissed() {
        if (this._readyToConsolidateBackCallback) {
            this._readyToConsolidateBackCallback();
            this._readyToConsolidateBackCallback = undefined;
        }
    }

    attached() {
        this.aureliaContainer = this.element.querySelector(`#${this.uniqueIdentifier}`) || undefined;
        ReactDom.unmountComponentAtNode(this.container);
        const container = this.element.querySelector(`#${this.uniqueIdentifier}`);
        if (container) {
            this.container = container;
        }

        super.attached();
    }

    detached() {
        ReactDom.unmountComponentAtNode(this.container);
    }

    get children(): any[] { return []; }

    createElement(): any {
        let element: any;

        this.handleProperties();

        const childElements = this.children.map(_ => _.createElement());

        if (this._wrapperType) {
            if (childElements && childElements.length > 0) {
                element = React.createElement(this._wrapperType, this.props, childElements);
            } else {
                element = React.createElement(this._wrapperType, this.props);
            }
        } else {
            element = React.createElement('span', childElements) as any;
        }
        return element;
    }

    render() {
        super.render();
        const element = this.createElement();
        this.reactComponent = ReactDom.render(element as any, this.container);
    }

    propertyChanged(propertyName: string, newValue: any, prevValue: any) {
        super.propertyChanged(propertyName, newValue, prevValue);
        this.handleVisibilityProperty();
        const property = this.properties.find(_ => _.name === propertyName);
        if (property) {
            this.props[property.reactName] = newValue;
        }
        this.handleRendering();
    }
}
