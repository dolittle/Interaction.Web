// Copyright (c) Dolittle. All rights reserved.
// Licensed under the MIT license. See LICENSE file in the project root for full license information.

import { IMessageBarProps, MessageBar, MessageBarType } from 'office-ui-fabric-react';
import { customElement, autoinject } from 'aurelia-framework';

import { ReactComponent } from '../../React/ReactComponent';
import { propertyConverter, KeyValueTypeConverter } from '../../index';

@autoinject
@customElement('message-bar')
export class AuMessageBar extends ReactComponent<React.FunctionComponent<IMessageBarProps>, IMessageBarProps> {

    @propertyConverter('type', new KeyValueTypeConverter({
        'info': MessageBarType.info,
        'error': MessageBarType.error,
        'blocked': MessageBarType.blocked,
        'severeWarning': MessageBarType.severeWarning,
        'success': MessageBarType.success,
        'warning': MessageBarType.warning
    }))
    get messageBarType(): MessageBarType { return MessageBarType.info; }

    constructor(element: Element) {
        super(element, MessageBar);
    }
}

AuMessageBar.properties<IMessageBarProps>({
    messageBarType: {} as any,
    actions: {} as any,
    ariaLabel: {} as any,
    isMultiline: {} as any,
    dismissButtonAriaLabel: {} as any,
    truncated: {} as any,
    overflowButtonAriaLabel: {} as any,
    className: {} as any,
    theme: {} as any,
    dismissIconProps: {} as any,
    messageBarIconProps: {} as any,

    onDismiss: () => {}
});
